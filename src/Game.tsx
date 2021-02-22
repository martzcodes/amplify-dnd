import { useEffect, useLayoutEffect, useState } from "react";
import BaseLayer from "./BaseLayer";
import InteractionLayer from "./InteractionLayer";
import "./Game.css";
import { Action } from "./models/Action";
import { Location } from "./models/Location";
import { Character, CharacterProps } from "./Character";
import { Room, roomA, roomB, roomC, roomD, roomE, roomF, roomG } from "./Room";
import { tileTypes } from "./Tile";
import { hashLocation } from "./utils/hashLocation";
import { Door } from "./Door";
import UserLayer from "./UserLayer";
import { useParams } from "react-router-dom";

export interface CharacterTracker {
  active: Character;
  initiative: string[];
  characters: Character[];
}

const noMove = new Set([
  "wall",
  "WALL",
  "void",
  "VOID",
  "door-closed",
  "door-locked",
  "character",
]);

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

const startingDoors = [
  {
    origin: { x: 4, y: 8 },
    northSouth: false,
    open: true,
    locked: false,
  },
  {
    origin: { x: 18, y: 19 },
    northSouth: true,
    open: false,
    locked: false,
  },
  {
    origin: { x: 24, y: 14 },
    northSouth: false,
    open: false,
    locked: true,
  },
  {
    origin: { x: 19, y: 24 },
    northSouth: true,
    open: false,
    locked: false,
  },
  {
    origin: { x: 14, y: 5 },
    northSouth: true,
    open: false,
    locked: true,
  },
  {
    origin: { x: 30, y: 13 },
    northSouth: false,
    open: false,
    locked: true,
  },
  {
    origin: { x: 30, y: 26 },
    northSouth: false,
    open: false,
    locked: true,
  },
];

const emptyAction = {
  character: "",
  action: "",
  location: { x: -1, y: -1 },
};

const characterProps: CharacterProps[] = [
  // {
  //   id: "martzcodes",
  //   name: "martzcodes",
  //   color: "bg-blue-500",
  //   speed: { max: 30, current: 30 },
  //   hp: { max: 30, current: 30 },
  //   vision: 60,
  //   actionUsed: false,
  //   location: { x: 1, y: 7 },
  // },
  // {
  //   id: "someone",
  //   name: "someone",
  //   color: "bg-red-500",
  //   speed: { max: 30, current: 30 },
  //   hp: { max: 30, current: 30 },
  //   vision: 60,
  //   actionUsed: false,
  //   location: { x: 1, y: 9 },
  // },
];

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

function Game({ dm, rooms }: { dm?: boolean, rooms: Room[] }) {
  const { gameId, characterId } = useParams<{gameId: string; characterId: string}>();
  const initialDoors: Door[] = startingDoors.map(
    (startingDoor) => new Door(startingDoor)
  );
  const [doors, setDoors] = useState(initialDoors);

  const emptyBoard = generateBoard({ rooms });
  const initialSightMap = calculateSightMap(emptyBoard, doors);
  const initialMoveMap = calculateMoveMap(emptyBoard, doors);
  const initialMaps = {
    board: emptyBoard,
    sight: initialSightMap,
    move: initialMoveMap,
  };
  const [maps, setMaps] = useState(initialMaps);

  const characters = characterProps.map((props) => new Character(props));

  const [tracker, setTracker] = useState<CharacterTracker>({
    active: characters[0],
    initiative: characters.map((character) => character.id),
    characters,
  });

  useEffect(() => {
    console.log(rooms);
    const updatedMaps = {
      board: generateBoard({ rooms }),
      sight: [],
      move: [],
    };
    setMaps(updatedMaps);
  }, [rooms]);

  useEffect(() => {
    const updateSpeedAndVision = async () => {
      const updatedTracker: CharacterTracker = {
        ...tracker,
        characters: [],
      };
      for (let characterInd = 0; characterInd < tracker.characters.length; characterInd++) {
        const character = tracker.characters[characterInd];
        await character.processVision(maps.sight);
        await character.recursiveMovement(maps.move, character.location, 0);
        if (character.id === tracker.active.id) {
          updatedTracker.active = character;
        }
        updatedTracker.characters.push(character);
      }
      setTracker(updatedTracker);
    };
    updateSpeedAndVision();
  }, [maps]);

  const updateCharacter = (character: Character) => {
    const updatedTracker = { ...tracker };
    if (character.id === updatedTracker.active.id) {
      updatedTracker.active = character;
    }
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
      let nextActiveInd = tracker.initiative.indexOf(tracker.active.id) + 1;
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
      await refreshedCharacter.recursiveMovement(maps.move, character!.location, 0);
      characters[characterInd] = refreshedCharacter;
      setCharacterAction({ ...emptyAction });
      setTracker({
        ...tracker,
        active: refreshedCharacter!,
        characters,
      });
    };

    const moveCharacter = async (location: Location) => {
      const character = tracker.active;
      if (
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
        const characterInd = tracker.characters.findIndex((trackerCharacter) => trackerCharacter.id === character.id);
        refreshedCharacter.selectedTile = null;
        tracker.characters[characterInd] = refreshedCharacter;
        tracker.active = refreshedCharacter;
        console.log(refreshedCharacter);
        if (refreshedCharacter.speed.current > 0 || !refreshedCharacter.actionUsed) {
          setCharacterAction({ ...emptyAction });
          setTracker({
            ...tracker,
            characters: [
              ...tracker.characters,
            ],
          });
        } else {
          await nextCharacter(tracker.characters);
        }
      }
    };

    const openDoor = (doorLoc: Location, destroy: boolean) => {
      const doorInd = doors.findIndex((door) => {
        return door.getDoors().filter(specificDoor => {
          return specificDoor.location.x === doorLoc.x && specificDoor.location.y === doorLoc.y;
        }).length !== 0;
      });
      const updatedDoors = [...doors];
      if (doorInd !== -1) {
        updatedDoors[doorInd] = new Door({ ...doors[doorInd], open: true, locked: false });
        console.log(updatedDoors);
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
      setCharacterAction(emptyAction);
      if (tracker.active.speed.current <= 0) {
        nextCharacter(tracker.characters);
      } else {
        const refreshedCharacter = new Character({
          ...tracker.active,
          actionUsed: true,
        });
        const characterInd = tracker.characters.findIndex(trackerCharacter => trackerCharacter.id === refreshedCharacter.id);
        tracker.characters[characterInd] = refreshedCharacter;
        setTracker({
          ...tracker,
          characters: {
            ...tracker.characters,
          },
        });
      }
      // initializeCharacters();
    };

    const dashAction = async () => {
      const currentCharacter = tracker.active;
      const refreshedCharacter = new Character({
        ...tracker.active,
        actionUsed: true,
        speed: {
          max: currentCharacter.speed.max,
          current: currentCharacter.speed.current + currentCharacter.speed.max,
        },
      });
      await refreshedCharacter.processMovement();
      await refreshedCharacter.recursiveMovement(
        maps.move,
        refreshedCharacter.location,
        0
      );
      await refreshedCharacter.processVision(maps.sight);
      const updatedTracker = {...tracker, active: refreshedCharacter};
      const characterInd = updatedTracker.characters.findIndex(trackerCharacter => trackerCharacter.id === refreshedCharacter.id);
      updatedTracker.characters[characterInd] = refreshedCharacter;

      setCharacterAction(emptyAction);
      setTracker(updatedTracker);
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
    console.log('updating maps');
    const updatedSightMap = calculateSightMap(maps.board, doors);
    const updatedMoveMap = calculateMoveMap(maps.board, doors);
    setMaps({
      board: maps.board,
      sight: updatedSightMap,
      move: updatedMoveMap
    });
  }, [doors]);
  console.log(maps);

  const characterToView = characterId
    ? tracker.characters.filter(
        (trackerCharacter) => trackerCharacter.id === characterId
      )[0]
    : tracker.active;
  return (
    <>
      {rooms.length && tracker ? (
        <div className="flex py-5">
          {dm ? <div className="flex-none w-full md:max-w-xs"></div> : <></>}
          <div className="flex-1">
            <div className="LayerMap">
              <div className={`Layered bg-black`}>
                <BaseLayer board={maps.board}></BaseLayer>
              </div>
              <div className="Layered">
                <UserLayer
                  board={maps.board}
                  doors={doors}
                  dm={dm}
                  character={characterToView}
                  updateCharacter={(character: Character) => {
                    console.log(character);
                    updateCharacter(character);
                  }}
                  renderable={tracker.characters.filter(character => character.id !== characterToView.id).map(character => ({
                    name: character.name,
                    class: character.color,
                    location: character.location,
                    description: JSON.stringify(character.getStats()),
                    actions: []
                  }))}
                ></UserLayer>
              </div>
            </div>
          </div>
          <div className="flex-none w-full md:max-w-xs">
            {characterToView && characterToView.id === tracker.active.id ? [
              { name: "End Turn", type: "end", color: "red" },
              { name: "Dash", type: "dash", color: "blue" },
              ...(tracker.active.selectedTile?.actions || []),
            ].map((action: Action) => (
              <button
                key={action.type}
                className={`h-10 px-5 m-2 font-bold text-lg text-${action.color}-100 transition-colors duration-150 bg-${action.color}-700 rounded-lg focus:shadow-outline hover:bg-${action.color}-800`}
                onClick={() => {
                  setCharacterAction({
                    character: tracker.active.id,
                    action: action.type,
                    location: tracker.active.selectedTile?.location,
                  });
                }}
              >
                {action.name}
              </button>
            )) : <></>}
            <pre>{`${JSON.stringify(
              tracker.active && tracker.active.selectedTile,
              null,
              2
            )}`}</pre>
            <pre>{`${JSON.stringify(tracker.active && tracker.active.getStats(), null, 2)}`}</pre>
            <pre>{`${JSON.stringify(tracker, null, 2)}`}</pre>
          </div>
        </div>
      ) : (
        <></>
      )}
      {tracker ? (
        <div className="grid grid-cols-2 gap-4">
          {/* <div>
            <Board
              selectedTile={selectedTile}
              setSelectedTile={setSelectedTile}
              tracker={{
                ...tracker,
                characters: { martzcodes: tracker.characters.martzcodes },
              }}
              board={board}
            ></Board>
          </div>
          <div>
            <Board
              selectedTile={selectedTile}
              setSelectedTile={setSelectedTile}
              tracker={{
                ...tracker,
                characters: { npc: tracker.characters.npc },
              }}
              board={board}
            ></Board>
          </div> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Game;
