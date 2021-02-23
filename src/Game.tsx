import { useEffect, useLayoutEffect, useState } from "react";
import BaseLayer from "./BaseLayer";
import "./Game.css";
import { Action } from "./models/Action";
import { Location } from "./models/Location";
import { Character, CharacterProps } from "./Character";
import { Room } from "./Room";
import { tileTypes } from "./Tile";
import { hashLocation } from "./utils/hashLocation";
import { Door } from "./Door";
import UserLayer from "./UserLayer";
import { useParams } from "react-router-dom";

export interface CharacterTracker {
  active: string;
  initiative: string[];
  characters: Character[];
}

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

const characterProps: CharacterProps[] = [];

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
          return doors[doorInd].open ? 2.5 : 999;
        }
        return 999;
      }
      return tileTypes[tile].speed || 999;
    })
  );
};

const getActiveCharacter = (tracker: CharacterTracker) => {
  return tracker.characters.find(
    (character) => character.name === tracker.active
  );
};

function Game({
  dm,
  rooms,
  doors: serverDoors,
  tracker: serverTracker,
  showPoints,
}: {
  dm?: boolean;
  rooms: Room[];
  doors: Door[];
  tracker: CharacterTracker;
  showPoints?: boolean;
}) {
  const { gameId, characterId } = useParams<{
    gameId: string;
    characterId: string;
  }>();
  const [doors, setDoors] = useState(serverDoors);

  const emptyBoard = generateBoard({ rooms });
  const initialSightMap = calculateSightMap(emptyBoard, doors);
  const initialMoveMap = calculateMoveMap(emptyBoard, doors);
  const initialMaps = {
    board: emptyBoard,
    sight: initialSightMap,
    move: initialMoveMap,
  };
  const [maps, setMaps] = useState(initialMaps);

  const [tracker, setTracker] = useState<CharacterTracker>(serverTracker);

  const updateSpeedAndVision = async () => {
    console.log('updating speed and vision');
    const updatedTracker: CharacterTracker = {
      ...tracker,
      characters: [],
    };
    for (
      let characterInd = 0;
      characterInd < tracker.characters.length;
      characterInd++
    ) {
      const character = tracker.characters[characterInd];
      await character.processVision(maps.sight);
      await character.recursiveMovement(maps.move, character.location, 0);
      updatedTracker.characters.push(character);
    }
    setTracker(updatedTracker);
  };

  useEffect(() => {
    console.log('maps');
    const updatedMaps = {
      board: generateBoard({ rooms }),
      sight: [],
      move: [],
    };
    setMaps(updatedMaps);
  }, [rooms]);

  useEffect(() => {
    console.log('doors');
    setDoors(serverDoors);

  }, [serverDoors]);

  useEffect(() => {
    console.log("tracker");
    setTracker(serverTracker);
  }, [serverTracker]);

  useEffect(() => {
    updateSpeedAndVision();
  }, [maps]);

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
        (character) => character.name === tracker.initiative[nextActiveInd]
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
      setTracker({
        ...tracker,
        characters,
      });
    };

    const moveCharacter = async (location: Location) => {
      const character = getActiveCharacter(tracker);
      if (
        character &&
        characterAction.character === character.name &&
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
        if (
          refreshedCharacter.speed.current > 0 ||
          !refreshedCharacter.actionUsed
        ) {
          setCharacterAction({ ...emptyAction });
          setTracker({
            ...tracker,
            characters: [...tracker.characters],
          });
        } else {
          await nextCharacter(tracker.characters);
        }
      }
    };

    const openDoor = (doorLoc: Location, destroy: boolean) => {
      const doorInd = doors.findIndex((door) => {
        return (
          door.getDoors().filter((specificDoor) => {
            return (
              specificDoor.location.x === doorLoc.x &&
              specificDoor.location.y === doorLoc.y
            );
          }).length !== 0
        );
      });
      const updatedDoors = [...doors];
      if (doorInd !== -1) {
        updatedDoors[doorInd] = new Door({
          ...doors[doorInd],
          open: true,
          locked: false,
        });
        setDoors(updatedDoors);
      }
    };

    const closeDoor = (doorLoc: Location) => {
      const doorInd = doors.findIndex((door) => {
        return (
          door.getDoors().filter((specificDoor) => {
            return (
              specificDoor.location.x === doorLoc.x &&
              specificDoor.location.y === doorLoc.y
            );
          }).length !== 0
        );
      });
      const updatedDoors = [...doors];
      if (doorInd !== -1) {
        updatedDoors[doorInd] = new Door({
          ...doors[doorInd],
          open: false,
        });
        setDoors(updatedDoors);
      }
    };

    const usedAction = () => {
      const activeCharacter = getActiveCharacter(tracker);
      if (activeCharacter) {
        setCharacterAction(emptyAction);
        if (activeCharacter.speed.current <= 0) {
          nextCharacter(tracker.characters);
        } else {
          const refreshedCharacter = new Character({
            ...activeCharacter,
            actionUsed: true,
          });
          const characterInd = tracker.characters.findIndex(
            (trackerCharacter) => trackerCharacter.id === refreshedCharacter.id
          );
          tracker.characters[characterInd] = refreshedCharacter;
          setTracker({
            ...tracker,
            characters: {
              ...tracker.characters,
            },
          });
        }
      }
    };

    const dashAction = async () => {
      const activeCharacter = getActiveCharacter(tracker);
      if (activeCharacter) {
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

        setCharacterAction(emptyAction);
        setTracker(updatedTracker);
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
      case "unlock":
      case "open":
        if (characterAction.location) {
          openDoor(characterAction.location, false);
        }
        break;
      case "break":
        if (characterAction.location) {
          openDoor(characterAction.location, false);
        }
        break;
      case "close":
        if (characterAction.location) {
          closeDoor(characterAction.location);
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
    const updatedSightMap = calculateSightMap(maps.board, doors);
    const updatedMoveMap = calculateMoveMap(maps.board, doors);
    console.log(updatedSightMap);
    setMaps({
      board: maps.board,
      sight: updatedSightMap,
      move: updatedMoveMap,
    });
  }, [doors]);

  const activeCharacter = getActiveCharacter(tracker);
  const characterToView = characterId
    ? tracker.characters.filter(
        (trackerCharacter) => trackerCharacter.id === characterId
      )[0]
    : activeCharacter;

  console.log(JSON.stringify(tracker.characters));
  return (
    <>
      {rooms.length && tracker ? (
        <div className="flex py-5">
          {dm ? <div className="flex-none w-full md:max-w-xs"></div> : <></>}
          <div className="flex-1">
            <div className="LayerMap">
              <div className={`Layered bg-black`}>
                <BaseLayer
                  board={maps.board}
                  dm={dm}
                  showPoints={showPoints}
                ></BaseLayer>
              </div>
              <div className="Layered">
                {characterToView ? (
                  <UserLayer
                    board={maps.board}
                    doors={doors}
                    dm={dm}
                    character={characterToView}
                    updateCharacter={(character: Character) => {
                      updateCharacter(character);
                    }}
                    renderable={tracker.characters
                      .filter(
                        (character) => character.id !== characterToView.id
                      )
                      .map((character) => ({
                        name: character.name,
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
          {characterToView && activeCharacter ? (
            <div className="flex-none w-full md:max-w-xs">
              {characterToView && characterToView.id === activeCharacter.id ? (
                [
                  { name: "End Turn", type: "end", color: "red" },
                  { name: "Dash", type: "dash", color: "blue" },
                  ...(activeCharacter.selectedTile?.actions || []),
                ].map((action: Action) => (
                  <button
                    key={action.type}
                    className={`h-10 px-5 m-2 font-bold text-lg text-${action.color}-100 transition-colors duration-150 bg-${action.color}-700 rounded-lg focus:shadow-outline hover:bg-${action.color}-800`}
                    onClick={() => {
                      setCharacterAction({
                        character: activeCharacter.id,
                        action: action.type,
                        location: activeCharacter.selectedTile?.location,
                      });
                    }}
                  >
                    {action.name}
                  </button>
                ))
              ) : (
                <></>
              )}
              <pre>{`${JSON.stringify(
                activeCharacter && activeCharacter.selectedTile,
                null,
                2
              )}`}</pre>
              <pre>{`${JSON.stringify(
                activeCharacter && activeCharacter.getStats(),
                null,
                2
              )}`}</pre>
              <pre>{`${JSON.stringify(tracker, null, 2)}`}</pre>
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
