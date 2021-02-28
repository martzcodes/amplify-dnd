import { useEffect, useLayoutEffect, useState } from "react";
import BaseLayer from "./BaseLayer";
import "./Game.css";
import { Location } from "./models/Location";
import { Character } from "./Character";
import { Room } from "./Room";
import { tileTypes } from "./Tile";
import { hashLocation } from "./utils/hashLocation";
import { Door } from "./Door";
import UserLayer from "./UserLayer";
import { useParams } from "react-router-dom";
import {
  updateGame as updateGameMutation,
  updateGameCharacter as updateGameCharacterMutation,
  updateGameDoor as updateGameDoorMutation,
} from "./graphql/mutations";
import { API } from "aws-amplify";
import { GameProps } from "./DM/GameEditor";
import { AreaProps, generateAreaLocations } from "./Area";
import InitiativeList from "./InitiativeList";
import AreaList from "./AreaList";
import ActionList from "./ActionList";

export interface CharacterTracker {
  active: string;
  initiative: string[];
  characters: Character[];
}

interface Maps {
  board: string[][];
  sight: boolean[][][];
  move: number[][];
}

export const bumpGame = (gameId: string) => {
  API.graphql({
    query: updateGameMutation,
    variables: {
      input: {
        id: gameId,
        lastAction: `${Date.now()}`,
      },
    },
  });
};

const generateBoard = ({ rooms }: { rooms: Room[] }): string[][] => {
  let height = 0;
  let width = 0;
  rooms.forEach((room) => {
    if (room.origin.x + room.width > width) {
      width = room.origin.x + room.width;
    }
    if (room.origin.y + room.height > height) {
      height = room.origin.y + room.height;
    }
  });
  const board = Array(height)
    .fill("")
    .map((row) => {
      return Array(width)
        .fill("")
        .map((tile) => {
          return "VOID";
        });
    });
  rooms.forEach((room) => {
    for (let y = 0; y < room.height; y++) {
      for (let x = 0; x < room.width; x++) {
        board[y + room.origin.y][x + room.origin.x] = room.grid[y][x];
      }
    }
  });
  return board;
};

const emptyAction = {
  character: "",
  action: "",
  location: { x: -1, y: -1 },
};

const calculateSightMap = (board: string[][], doors: Door[]) => {
  return board.map((row, y) =>
    row.map((tile, x) => {
      if (tile === "VOID") {
        return [false, true];
      }
      if (tile.startsWith("W")) {
        const doorInd = doors.findIndex(
          (door) => door.checkDoor({ x, y }).door
        );
        if (doorInd !== -1) {
          return [true, !doors[doorInd].open];
        }
        return [true, true];
      }
      return [true, false];
    })
  );
};

const calculateMoveMap = (board: string[][], doors: Door[]) => {
  return board.map((row, y) =>
    row.map((tile, x) => {
      if (tile.startsWith("W")) {
        const doorInd = doors.findIndex(
          (door) => door.checkDoor({ x, y }).door
        );
        if (doorInd !== -1) {
          return doors[doorInd].open ? 5 : 999;
        }
        return 999;
      }
      return tileTypes[tile].speed || 999;
    })
  );
};

const getActiveCharacter = (tracker: CharacterTracker) => {
  return tracker.characters.find(
    (character) => character.id === tracker.active
  );
};

function Game({
  dm,
  showPoints,
  game,
}: {
  dm?: boolean;
  game: GameProps;
  showPoints?: boolean;
}) {
  const { gameId, characterId } = useParams<{
    gameId: string;
    characterId: string;
  }>();
  const emptyBoard = generateBoard({ rooms: game.rooms });
  const initialSightMap = calculateSightMap(emptyBoard, []);
  const initialMoveMap = calculateMoveMap(emptyBoard, []);
  const initialMaps = {
    board: emptyBoard,
    sight: initialSightMap,
    move: initialMoveMap,
  };
  const [maps, setMaps] = useState<Maps>(initialMaps);
  const [viewCharacter, setViewCharacter] = useState<Character | null>(null);

  const [tracker, setTracker] = useState<CharacterTracker>({
    active: game.active,
    initiative: game.initiative,
    characters: game.characters,
  });

  const updateSpeedAndVision = async (
    updatedMaps: Maps,
    characterTracker: CharacterTracker
  ) => {
    console.log("updating speed and vision");
    const updatedTracker: CharacterTracker = {
      ...characterTracker,
      characters: [],
    };
    for (
      let characterInd = 0;
      characterInd < characterTracker.characters.length;
      characterInd++
    ) {
      const character = new Character({
        ...characterTracker.characters[characterInd],
      });
      const oldRevealed = [...Array.from(character.revealed)];
      await character.processVision(updatedMaps.sight);
      if (character.id === characterId) {
        const newRevealed = [...Array.from(character.revealed)];
        if (
          newRevealed.filter((rev) => !oldRevealed.includes(rev)).length > 0
        ) {
          await API.graphql({
            query: updateGameCharacterMutation,
            variables: {
              input: {
                id: characterId,
                revealed: newRevealed,
              },
            },
          });
        }
      }
      await character.recursiveMovement(
        updatedMaps.move,
        character.location,
        0
      );
      updatedTracker.characters.push(character);
    }
    setMaps(updatedMaps);
    setTracker(updatedTracker);
  };

  useEffect(() => {
    console.log("game effect");
    const board = generateBoard({ rooms: game.rooms });
    const updatedSightMap = calculateSightMap(board, game.doors);
    const updatedMoveMap = calculateMoveMap(board, game.doors);
    const updatedMaps = {
      board,
      sight: updatedSightMap,
      move: updatedMoveMap,
    };

    updateSpeedAndVision(updatedMaps, {
      active: game.active,
      initiative: game.initiative,
      characters: game.characters,
    });
  }, [game]);

  const updateCharacter = (character: Character) => {
    const updatedTracker = { ...tracker };
    const characterInd = updatedTracker.characters.findIndex(
      (trackerCharacter) => trackerCharacter.id === character.id
    );
    updatedTracker.characters[characterInd] = character;
    setTracker(updatedTracker);
  };

  const [characterAction, setCharacterAction] = useState<{
    character: string;
    action: string;
    location?: Location;
  }>({
    ...emptyAction,
    action: "init",
  });

  useLayoutEffect(() => {
    const nextCharacter = async (characters: Character[]) => {
      let nextActiveInd = tracker.initiative.indexOf(tracker.active) + 1;
      if (nextActiveInd >= tracker.initiative.length) {
        nextActiveInd = 0;
      }
      console.log(`Next Active: ${tracker.initiative[nextActiveInd]}`);
      const characterInd = characters.findIndex(
        (character) => character.id === tracker.initiative[nextActiveInd]
      );
      const character = characters[characterInd];
      const refreshedCharacter = new Character({
        ...character!,
        actionUsed: false,
        selectedTile: null,
        speed: {
          max: character!.speed.max,
          current: character!.speed.max,
        },
      });
      await refreshedCharacter.processMovement();
      await refreshedCharacter.processVision(maps.sight);
      await refreshedCharacter.recursiveMovement(
        maps.move,
        character!.location,
        0
      );
      characters[characterInd] = refreshedCharacter;
      setCharacterAction({ ...emptyAction });
      await API.graphql({
        query: updateGameCharacterMutation,
        variables: {
          input: {
            id: refreshedCharacter.id,
            actionUsed: refreshedCharacter.actionUsed,
            speed: refreshedCharacter.speed,
          },
        },
      });
      await API.graphql({
        query: updateGameMutation,
        variables: {
          input: {
            id: gameId,
            paused: game.autoPause,
            active: refreshedCharacter.id,
          },
        },
      });
      setTracker({
        ...tracker,
        characters,
      });
    };

    const moveCharacter = async (location: Location) => {
      const character = getActiveCharacter(tracker);
      if (
        character &&
        characterAction.character === character.id &&
        (character.location.x !== location.x ||
          character.location.y !== location.y) &&
        character.movement.tiles.has(hashLocation(location))
      ) {
        const refreshedCharacter = new Character({
          ...character,
        });
        await refreshedCharacter.move(maps.move, location);
        await refreshedCharacter.processVision(maps.sight);
        const characterInd = tracker.characters.findIndex(
          (trackerCharacter) => trackerCharacter.id === character.id
        );
        refreshedCharacter.selectedTile = null;
        tracker.characters[characterInd] = refreshedCharacter;
        await API.graphql({
          query: updateGameCharacterMutation,
          variables: {
            input: {
              id: refreshedCharacter.id,
              location: refreshedCharacter.location,
              actionUsed: refreshedCharacter.actionUsed,
              speed: refreshedCharacter.speed,
            },
          },
        });
        if (
          refreshedCharacter.speed.current > 0 ||
          !refreshedCharacter.actionUsed
        ) {
          setCharacterAction({ ...emptyAction });
          bumpGame(gameId);
        } else {
          await nextCharacter(tracker.characters);
        }
      }
    };

    const toggleDoor = async (doorLoc: Location, open: boolean) => {
      const character = getActiveCharacter(tracker);
      const doorInd = game.doors.findIndex((door: Door) => {
        return (
          door.getDoors().filter((specificDoor) => {
            return (
              specificDoor.location.x === doorLoc.x &&
              specificDoor.location.y === doorLoc.y
            );
          }).length !== 0
        );
      });
      if (character && doorInd !== -1) {
        const door: Door = game.doors[doorInd];
        await API.graphql({
          query: updateGameDoorMutation,
          variables: {
            input: {
              id: door.id,
              open,
            },
          },
        });
        await API.graphql({
          query: updateGameCharacterMutation,
          variables: {
            input: {
              id: character.id,
              actionUsed: true,
            },
          },
        });
        console.log("toggle door bump game");
        bumpGame(gameId);
      }
    };

    const dashAction = async () => {
      const activeCharacter = getActiveCharacter(tracker);
      if (activeCharacter && !activeCharacter.actionUsed) {
        const refreshedCharacter = new Character({
          ...activeCharacter,
          actionUsed: true,
          speed: {
            max: activeCharacter.speed.max,
            current: activeCharacter.speed.current + activeCharacter.speed.max,
          },
        });
        await refreshedCharacter.processMovement();
        await refreshedCharacter.recursiveMovement(
          maps.move,
          refreshedCharacter.location,
          0
        );
        await refreshedCharacter.processVision(maps.sight);
        const updatedTracker = { ...tracker };
        const characterInd = updatedTracker.characters.findIndex(
          (trackerCharacter) => trackerCharacter.id === refreshedCharacter.id
        );
        updatedTracker.characters[characterInd] = refreshedCharacter;
        await API.graphql({
          query: updateGameCharacterMutation,
          variables: {
            input: {
              id: refreshedCharacter.id,
              actionUsed: true,
              speed: refreshedCharacter.speed,
            },
          },
        });
        bumpGame(gameId);
      }
    };

    switch (characterAction.action) {
      case "init":
        break;
      case "end":
        nextCharacter(tracker.characters);
        break;
      case "move":
        if (characterAction.location) {
          moveCharacter(characterAction.location);
        }
        break;
      case "open":
        if (characterAction.location) {
          toggleDoor(characterAction.location, true);
        }
        break;
      case "close":
        if (characterAction.location) {
          toggleDoor(characterAction.location, false);
        }
        break;
      case "dash":
        dashAction();
        break;
      default:
        return;
    }
  }, [characterAction]);

  useEffect(() => {
    const activeCharacter = getActiveCharacter(tracker);
    const characterToView = characterId
      ? tracker.characters.filter(
          (trackerCharacter) => trackerCharacter.id === characterId
        )[0]
      : activeCharacter || null;
    console.log("setting character to view");
    setViewCharacter(
      characterToView ? new Character({ ...characterToView }) : null
    );
  }, [tracker]);

  return (
    <>
      {game.rooms.length && tracker ? (
        <div className="flex py-5">
          <div className="flex-1">
            <div className="LayerMap">
              <div className={`Layered bg-black`}>
                <BaseLayer board={maps.board}></BaseLayer>
              </div>
              <div className="Layered">
                {viewCharacter ? (
                  <UserLayer
                    board={maps.board}
                    doors={game.doors}
                    dm={dm}
                    character={viewCharacter}
                    showPoints={showPoints}
                    updateCharacter={(character: Character) => {
                      updateCharacter(character);
                    }}
                    renderable={tracker.characters
                      .filter((character) => character.id !== viewCharacter.id)
                      .map((character) => ({
                        name: character.name,
                        content: character.icon,
                        class: character.color,
                        location: character.location,
                        description: JSON.stringify(character.getStats()),
                        actions: [],
                      }))}
                  ></UserLayer>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          {viewCharacter ? (
            <div className="flex-none w-full md:max-w-xs">
              <div
                className={`pb-5 ${
                  dm ? "bg-black" : viewCharacter.color
                } text-white text-3xl text-center`}
              >
                {dm ? "DM VIEW" : viewCharacter.name}
              </div>
              <div className="flex">
                <div className="flex-1">
                  <label
                    htmlFor="character_icon"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Character Icon (emoji?)
                  </label>
                  <input
                    type="text"
                    name="character_icon"
                    onChange={(e) => {
                      if (viewCharacter) {
                        setViewCharacter(
                          new Character({
                            ...viewCharacter,
                            icon: e.target.value,
                          })
                        );
                      }
                    }}
                    value={viewCharacter.icon}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex-1">
                  <button
                    className={`h-10 px-5 m-2 font-bold text-lg text-white transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-blue-800`}
                    onClick={() => {
                      API.graphql({
                        query: updateGameCharacterMutation,
                        variables: {
                          input: {
                            id: viewCharacter.id,
                            icon: viewCharacter.icon,
                          },
                        },
                      });
                      bumpGame(gameId);
                    }}
                  >
                    Set Icon
                  </button>
                </div>
              </div>
              <AreaList
                character={viewCharacter}
                areas={game.areas.filter((area: AreaProps) => {
                  const areaLocations = generateAreaLocations(
                    area.origin,
                    area.width,
                    area.height
                  );
                  if (areaLocations.has(hashLocation(viewCharacter.location))) {
                    if (area.perception === 0) {
                      return true;
                    }
                    return dm || viewCharacter.perception >= area.perception;
                  }
                  return false;
                })}
              ></AreaList>
              <InitiativeList
                active={tracker.active}
                characters={tracker.characters.filter((character) => {
                  if (!character.npc || dm) {
                    return true;
                  }
                  const players = tracker.characters.filter(
                    (character) => !character.npc
                  );
                  const visible =
                    players.filter((player) =>
                      player.visible.has(hashLocation(character.location))
                    ).length !== 0;
                  return visible;
                })}
                initiative={tracker.initiative}
              ></InitiativeList>
              {!game.paused || dm ? (
                <div>
                  {viewCharacter && viewCharacter.id === tracker.active ? (
                    <ActionList character={viewCharacter} setCharacterAction={setCharacterAction}></ActionList>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div>
                  Waiting for DM or another player...
                  {(getActiveCharacter(tracker) || {}).id === characterId
                    ? "Next Active Player is YOU!"
                    : ""}
                </div>
              )}
              {viewCharacter.selectedTile ? (
                <div>
                  <pre>
                    {JSON.stringify(viewCharacter.selectedTile, null, 2)}
                  </pre>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Game;
