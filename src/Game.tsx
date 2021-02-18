import { useEffect, useState } from "react";
import Board from "./Board";
import "./Game.css";
import { Action } from "./models/Action";
import { Location } from "./models/Location";
import { Player, PlayerProps } from "./Player";
import {
  getDoorsFromRooms,
  getRoom,
  Room,
  roomA,
  roomB,
  roomC,
  roomD,
  roomE,
  roomF,
  roomG,
  roomsToBoard,
} from "./Room";
import { hashLocation } from "./utils/hashLocation";

export interface PlayerTracker {
  active: string;
  initiative: string[];
  players: Record<string, Player>;
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

const initPlayers: PlayerProps[] = [
  {
    id: "P001",
    name: "martzcodes",
    color: "bg-purple-600",
    speed: {
      max: 30,
      current: 30,
    },
    hp: {
      max: 10,
      current: 10,
    },
    vision: 50,
    actionUsed: false,
    roomDescription: "",
  },
  {
    id: "P002",
    name: "npc",
    color: "bg-red-600",
    speed: {
      max: 30,
      current: 30,
    },
    hp: {
      max: 10,
      current: 10,
    },
    vision: 50,
    actionUsed: false,
    roomDescription: "",
  },
];

const emptyAction = {
  player: "",
  action: "",
  location: { x: -1, y: -1 },
};

const emptyTile = {
  location: { x: -1, y: -1 },
  player: "",
  type: "",
  speed: 0,
  actions: [],
};

function Game() {
  const [selectedTile, setSelectedTile] = useState(emptyTile);
  const [rooms] = useState<Record<string, Room>>({
    A: roomA,
    B: roomB,
    C: roomC,
    D: roomD,
    E: roomE,
    F: roomF,
    G: roomG,
  });
  const emptyBoard = roomsToBoard(rooms);
  const [board, setBoard] = useState(emptyBoard);
  const [tracker, setTracker] = useState<PlayerTracker>({
    active: "martzcodes",
    initiative: ["martzcodes", "npc"],
    players: initPlayers.reduce((p, c) => {
      const player = new Player(c);
      player.addBoard(board);
      player.roomDescription = `${getRoom(rooms, player.location)?.description}`;
      return { ...p, [c.name]: player };
    }, {} as Record<string, Player>),
  });
  const [playerAction, setPlayerAction] = useState({
    ...emptyAction,
    action: "init",
  });

  useEffect(() => {
    const nextPlayer = async (players: Record<string, Player>) => {
      let nextActiveInd = tracker.initiative.indexOf(tracker.active) + 1;
      if (nextActiveInd >= tracker.initiative.length) {
        nextActiveInd = 0;
      }
      console.log(`Next Active: ${tracker.initiative[nextActiveInd]}`);
      const nextPlayerName = tracker.initiative[nextActiveInd];
      const nextPlayer = new Player({
        ...tracker.players[nextPlayerName],
        actionUsed: false,
        speed: {
          max: tracker.players[nextPlayerName].speed.max,
          current: tracker.players[nextPlayerName].speed.max,
        },
      });
      await nextPlayer.processMovement(board, noMove);
      setPlayerAction({ ...emptyAction });
      setTracker({
        ...tracker,
        active: tracker.initiative[nextActiveInd],
        players: {
          ...tracker.players,
          ...players,
          [nextPlayerName]: nextPlayer,
        },
      });
    };

    const movePlayer = async (location: Location) => {
      const player = tracker.players[tracker.active];
      if (
        playerAction.player === player.name &&
        (player.location.x !== playerAction.location.x ||
          player.location.y !== playerAction.location.y)
      ) {
        const speedRemaining =
          player.speed.current - player.movement.cost[hashLocation(location)];
        if (speedRemaining >= 0) {
          if (emptyBoard[player.location.y][player.location.x].startsWith("P")) {
            board[player.location.y][player.location.x] = '    ';
          } else if (
            emptyBoard[player.location.y][player.location.x].startsWith("D")
          ) {
            board[player.location.y][player.location.x] = `DO${emptyBoard[
              player.location.y
            ][player.location.x].slice(2, 4)}`;
          } else {
            board[player.location.y][player.location.x] =
              emptyBoard[player.location.y][player.location.x];
          }
          board[playerAction.location.y][playerAction.location.x] = player.id;
          const refreshedPlayer = new Player({
            ...player,
            speed: {
              max: player.speed.max,
              current: speedRemaining,
            },
          });
          refreshedPlayer.addBoard(board);
          refreshedPlayer.roomDescription = `${
            getRoom(rooms, refreshedPlayer.location)?.description
          }`;
          const doors = getDoorsFromRooms(rooms);
          const closedDoors = doors.filter(
            (door) => door.startsWith("DL") || door.startsWith("DC")
          );
          closedDoors.forEach((door) => noMove.add(door));
          await refreshedPlayer.processMovement(board, noMove);
          setBoard(board);
          if (refreshedPlayer.speed.current > 0 || !refreshedPlayer.actionUsed) {
            setPlayerAction({ ...emptyAction });
            setTracker({
              ...tracker,
              players: {
                ...tracker.players,
                [refreshedPlayer.name]: refreshedPlayer,
              },
            });
          } else {
            await nextPlayer({ [refreshedPlayer.name]: refreshedPlayer });
          }
        }
      }
    };

    const initializePlayers = async () => {
      const doors = getDoorsFromRooms(rooms);
      const closedDoors = doors.filter(
        (door) => door.startsWith("DL") || door.startsWith("DC")
      );
      closedDoors.forEach((door) => noMove.add(door));
      const initialized: Record<string, Player> = {};
      const playerNames = Object.keys(tracker.players);
      for (let j = 0; j < playerNames.length; j++) {
        const refreshedPlayer = new Player(tracker.players[playerNames[j]]);
        await refreshedPlayer.processMovement(board, noMove);
        refreshedPlayer.roomDescription = `${
          getRoom(rooms, refreshedPlayer.location)?.description
        }`;
        initialized[playerNames[j]] = refreshedPlayer;
      }

      setTracker({
        ...tracker,
        players: initialized,
      });
      setPlayerAction(emptyAction);
    };

    const openDoor = (doorLoc: Location, destroy: boolean) => {
      const door = board[doorLoc.y][doorLoc.x];
      if (door.startsWith("DL") || door.startsWith("DC")) {
        if (destroy) {
          board[doorLoc.y][doorLoc.x] = `DD${door.slice(2, 4)}`;
        } else {
          board[doorLoc.y][doorLoc.x] = `DO${door.slice(2, 4)}`;
        }
        console.log(`DO${door.slice(2, 4)}`);
        setBoard(board);
        usedAction(true);
      }
    };

    const closeDoor = (doorLoc: Location) => {
      const door = board[doorLoc.y][doorLoc.x];
      if (door.startsWith("DO")) {
        board[doorLoc.y][doorLoc.x] = `DC${door.slice(2, 4)}`;
        console.log(`DC${door.slice(2, 4)}`);
        setBoard(board);
        usedAction(true);
      }
    };

    const usedAction = (init: boolean = false) => {
      setPlayerAction(emptyAction);
      if (tracker.players[tracker.active].speed.current === 0) {
        nextPlayer({});
      } else {
        const refreshedPlayer = new Player({
          ...tracker.players[tracker.active],
          actionUsed: true,
        });
        setTracker({
          ...tracker,
          players: {
            ...tracker.players,
            [refreshedPlayer.name]: refreshedPlayer,
          },
        });
      }
      initializePlayers();
    }

    const dashAction = async () => {
      const currentPlayer = tracker.players[tracker.active];;
      const refreshedPlayer = new Player({
        ...tracker.players[tracker.active],
        actionUsed: true,
        speed: {
          max: currentPlayer.speed.max,
          current: currentPlayer.speed.current + currentPlayer.speed.max,
        },
      });
      await refreshedPlayer.processMovement(board, noMove);
      setPlayerAction(emptyAction);
      setTracker({
        ...tracker,
        players: {
          ...tracker.players,
          [refreshedPlayer.name]: refreshedPlayer,
        },
      });
    };

    switch (playerAction.action) {
      case "init":
        initializePlayers();
        break;
      case "end":
        nextPlayer({});
        break;
      case "move":
        movePlayer(playerAction.location);
        break;
      case "unlock":
      case "open":
        openDoor(playerAction.location, false);
        break;
      case "break":
        openDoor(playerAction.location, true);
        break;
      case "close":
        closeDoor(playerAction.location);
        break;
      case "dash":
        dashAction();
        break;
      default:
        return;
    }
  }, [playerAction, tracker, board, rooms, emptyBoard]);

  useEffect(() => {
    if (playerAction.action === "") {
      setSelectedTile(emptyTile);
    }
  }, [playerAction]);

  return (
    <>
      {tracker ? (
        <div className="flex py-5">
          <div className="flex-1">
            <Board
              selectedTile={selectedTile}
              setSelectedTile={setSelectedTile}
              tracker={tracker}
              board={board}
            ></Board>
          </div>
          <div className="flex-none w-full md:max-w-xs">
            <div>{tracker.players[tracker.active].roomDescription}</div>
            {[
              { name: "End Turn", type: "end", color: "red" },
              { name: "Dash", type: "dash", color: "green" },
              ...selectedTile.actions,
            ].map((action: Action) => (
              <button
                key={action.type}
                className={`h-10 px-5 m-2 font-bold text-lg text-${action.color}-100 transition-colors duration-150 bg-${action.color}-700 rounded-lg focus:shadow-outline hover:bg-${action.color}-800`}
                onClick={() => {
                  setPlayerAction({
                    player: selectedTile.player,
                    action: action.type,
                    location: selectedTile.location,
                  });
                }}
              >
                {action.name}
              </button>
            ))}
            <pre>{`${JSON.stringify(selectedTile, null, 2)}`}</pre>
            <pre>{`${JSON.stringify(tracker.players[tracker.active].getStats(), null, 2)}`}</pre>
          </div>
        </div>
      ) : (
        <></>
      )}
      {tracker ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Game;
