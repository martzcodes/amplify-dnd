import { useEffect, useLayoutEffect, useState } from "react";
import BaseLayer from "./BaseLayer";
import InteractionLayer from "./InteractionLayer";
import "./Game.css";
import { Action } from "./models/Action";
import { Location } from "./models/Location";
import { Player, PlayerProps } from "./Player";
import { Room, roomA, roomB, roomC, roomD, roomE, roomF, roomG } from "./Room";
import { tileTypes } from "./Tile";
import { hashLocation } from "./utils/hashLocation";
import { Door } from "./Door";
import UserLayer from "./UserLayer";
import { useParams } from "react-router-dom";

export interface PlayerTracker {
  active: Player;
  initiative: string[];
  players: Player[];
}

const noMove = new Set([
  "wall",
  "WALL",
  "void",
  "VOID",
  "door-closed",
  "door-locked",
  "player",
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
    name: "AB",
    origin: { x: 4, y: 8 },
    northSouth: false,
    open: true,
    locked: false,
  },
  {
    name: "BC",
    origin: { x: 18, y: 19 },
    northSouth: true,
    open: false,
    locked: false,
  },
  {
    name: "BD",
    origin: { x: 24, y: 14 },
    northSouth: false,
    open: false,
    locked: true,
  },
  {
    name: "CE",
    origin: { x: 19, y: 24 },
    northSouth: true,
    open: false,
    locked: false,
  },
  {
    name: "BF",
    origin: { x: 14, y: 5 },
    northSouth: true,
    open: false,
    locked: true,
  },
  {
    name: "EG",
    origin: { x: 30, y: 13 },
    northSouth: false,
    open: false,
    locked: true,
  },
  {
    name: "FG",
    origin: { x: 30, y: 26 },
    northSouth: false,
    open: false,
    locked: true,
  },
];

const emptyAction = {
  player: "",
  action: "",
  location: { x: -1, y: -1 },
};

const characterProps: PlayerProps[] = [
  {
    id: "martzcodes",
    name: "martzcodes",
    color: "bg-blue-500",
    speed: { max: 30, current: 30 },
    hp: { max: 30, current: 30 },
    vision: 60,
    actionUsed: false,
    location: { x: 1, y: 7 },
  },
  {
    id: "someone",
    name: "someone",
    color: "bg-red-500",
    speed: { max: 30, current: 30 },
    hp: { max: 30, current: 30 },
    vision: 60,
    actionUsed: false,
    location: { x: 1, y: 9 },
  },
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

function Game({ dm }: { dm?: boolean }) {
  const { gameId, playerId } = useParams<{gameId: string; playerId: string}>();
  const initialDoors: Door[] = startingDoors.map(
    (startingDoor) => new Door(startingDoor)
  );
  const [doors, setDoors] = useState(initialDoors);

  const emptyBoard = generateBoard({
    rooms: [roomA, roomB, roomC, roomD, roomE, roomF, roomG],
  });
  const initialSightMap = calculateSightMap(emptyBoard, doors);
  const initialMoveMap = calculateMoveMap(emptyBoard, doors);
  const initialMaps = {
    board: emptyBoard,
    sight: initialSightMap,
    move: initialMoveMap,
  };
  const [maps, setMaps] = useState(initialMaps);

  const players = characterProps.map((props) => new Player(props));

  const [tracker, setTracker] = useState<PlayerTracker>({
    active: players[0],
    initiative: players.map((player) => player.id),
    players,
  });

  useEffect(() => {
    const updateSpeedAndVision = async () => {
      const updatedTracker: PlayerTracker = {
        ...tracker,
        players: [],
      };
      for (let playerInd = 0; playerInd < tracker.players.length; playerInd++) {
        const player = tracker.players[playerInd];
        await player.processVision(maps.sight);
        await player.recursiveMovement(maps.move, player.location, 0);
        if (player.id === tracker.active.id) {
          updatedTracker.active = player;
        }
        updatedTracker.players.push(player);
      }
      setTracker(updatedTracker);
    };
    updateSpeedAndVision();
  }, [maps]);

  const updatePlayer = (player: Player) => {
    const updatedTracker = { ...tracker };
    if (player.id === updatedTracker.active.id) {
      updatedTracker.active = player;
    }
    const playerInd = updatedTracker.players.findIndex(
      (trackerPlayer) => trackerPlayer.id === player.id
    );
    updatedTracker.players[playerInd] = player;
    setTracker(updatedTracker);
  };

  const [playerAction, setPlayerAction] = useState<{
    player: string;
    action: string;
    location?: Location;
  }>({
    ...emptyAction,
    action: "init",
  });

  useLayoutEffect(() => {
    const nextPlayer = async (players: Player[]) => {
      let nextActiveInd = tracker.initiative.indexOf(tracker.active.id) + 1;
      if (nextActiveInd >= tracker.initiative.length) {
        nextActiveInd = 0;
      }
      console.log(`Next Active: ${tracker.initiative[nextActiveInd]}`);
      const playerInd = players.findIndex(
        (player) => player.id === tracker.initiative[nextActiveInd]
      );
      const player = players[playerInd];
      const refreshedPlayer = new Player({
        ...player!,
        actionUsed: false,
        selectedTile: null,
        speed: {
          max: player!.speed.max,
          current: player!.speed.max,
        },
      });
      await refreshedPlayer.processMovement();
      await refreshedPlayer.processVision(maps.sight);
      await refreshedPlayer.recursiveMovement(maps.move, player!.location, 0);
      players[playerInd] = refreshedPlayer;
      setPlayerAction({ ...emptyAction });
      setTracker({
        ...tracker,
        active: refreshedPlayer!,
        players,
      });
    };

    const movePlayer = async (location: Location) => {
      const player = tracker.active;
      if (
        playerAction.player === player.name &&
        (player.location.x !== location.x ||
          player.location.y !== location.y) &&
        player.movement.tiles.has(hashLocation(location))
      ) {
        const refreshedPlayer = new Player({
          ...player,
        });
        await refreshedPlayer.move(maps.move, location);
        await refreshedPlayer.processVision(maps.sight);
        const playerInd = tracker.players.findIndex((trackerPlayer) => trackerPlayer.id === player.id);
        refreshedPlayer.selectedTile = null;
        tracker.players[playerInd] = refreshedPlayer;
        tracker.active = refreshedPlayer;
        console.log(refreshedPlayer);
        if (refreshedPlayer.speed.current > 0 || !refreshedPlayer.actionUsed) {
          setPlayerAction({ ...emptyAction });
          setTracker({
            ...tracker,
            players: [
              ...tracker.players,
            ],
          });
        } else {
          await nextPlayer(tracker.players);
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
      setPlayerAction(emptyAction);
      if (tracker.active.speed.current <= 0) {
        nextPlayer(tracker.players);
      } else {
        const refreshedPlayer = new Player({
          ...tracker.active,
          actionUsed: true,
        });
        const playerInd = tracker.players.findIndex(trackerPlayer => trackerPlayer.id === refreshedPlayer.id);
        tracker.players[playerInd] = refreshedPlayer;
        setTracker({
          ...tracker,
          players: {
            ...tracker.players,
          },
        });
      }
      // initializePlayers();
    };

    const dashAction = async () => {
      const currentPlayer = tracker.active;
      const refreshedPlayer = new Player({
        ...tracker.active,
        actionUsed: true,
        speed: {
          max: currentPlayer.speed.max,
          current: currentPlayer.speed.current + currentPlayer.speed.max,
        },
      });
      await refreshedPlayer.processMovement();
      await refreshedPlayer.recursiveMovement(
        maps.move,
        refreshedPlayer.location,
        0
      );
      await refreshedPlayer.processVision(maps.sight);
      const updatedTracker = {...tracker, active: refreshedPlayer};
      const playerInd = updatedTracker.players.findIndex(trackerPlayer => trackerPlayer.id === refreshedPlayer.id);
      updatedTracker.players[playerInd] = refreshedPlayer;

      setPlayerAction(emptyAction);
      setTracker(updatedTracker);
    };

    switch (playerAction.action) {
      case "init":
        break;
      case "end":
        nextPlayer(tracker.players);
        break;
      case "move":
        if (playerAction.location) {
          movePlayer(playerAction.location);
        }
        break;
      case "unlock":
      case "open":
        if (playerAction.location) {
          openDoor(playerAction.location, false);
        }
        break;
      case "break":
        if (playerAction.location) {
          openDoor(playerAction.location, false);
        }
        break;
      case "close":
        if (playerAction.location) {
          closeDoor(playerAction.location);
        }
        break;
      case "dash":
        dashAction();
        break;
      default:
        return;
    }
  }, [playerAction]);

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

  const playerToView = playerId
    ? tracker.players.filter(
        (trackerPlayer) => trackerPlayer.id === playerId
      )[0]
    : tracker.active;
  return (
    <>
      {tracker ? (
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
                  player={playerToView}
                  updatePlayer={(player: Player) => {
                    console.log(player);
                    updatePlayer(player);
                  }}
                  renderable={tracker.players.filter(player => player.id !== playerToView.id).map(player => ({
                    name: player.name,
                    class: player.color,
                    location: player.location,
                    description: JSON.stringify(player.getStats()),
                    actions: []
                  }))}
                ></UserLayer>
              </div>
            </div>
          </div>
          <div className="flex-none w-full md:max-w-xs">
            {playerToView.id === tracker.active.id ? [
              { name: "End Turn", type: "end", color: "red" },
              { name: "Dash", type: "dash", color: "blue" },
              ...(tracker.active.selectedTile?.actions || []),
            ].map((action: Action) => (
              <button
                key={action.type}
                className={`h-10 px-5 m-2 font-bold text-lg text-${action.color}-100 transition-colors duration-150 bg-${action.color}-700 rounded-lg focus:shadow-outline hover:bg-${action.color}-800`}
                onClick={() => {
                  setPlayerAction({
                    player: tracker.active.id,
                    action: action.type,
                    location: tracker.active.selectedTile?.location,
                  });
                }}
              >
                {action.name}
              </button>
            )) : <></>}
            <pre>{`${JSON.stringify(
              tracker.active.selectedTile,
              null,
              2
            )}`}</pre>
            <pre>{`${JSON.stringify(tracker.active.getStats(), null, 2)}`}</pre>
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
                players: { martzcodes: tracker.players.martzcodes },
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
                players: { npc: tracker.players.npc },
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
