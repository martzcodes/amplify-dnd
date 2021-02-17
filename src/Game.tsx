import { useEffect, useState } from "react";
import Board from "./Board";
import "./Game.css";
import { Action } from "./models/Action";
import { Location } from "./models/Location";
import { Player, PlayerProps } from "./Player";
import {
  getDoorsFromRooms,
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
    name: "martzcodes",
    color: "bg-purple-600",
    location: {
      x: 0,
      y: 8,
    },
    speed: {
      max: 30,
      current: 30,
    },
    hp: {
      max: 10,
      current: 10,
    },
    vision: 50,
  },
  {
    name: "npc",
    color: "bg-red-600",
    location: {
      x: 18,
      y: 8,
    },
    speed: {
      max: 30,
      current: 30,
    },
    hp: {
      max: 10,
      current: 10,
    },
    vision: 50,
  },
];

const emptyAction = {
  player: "",
  action: "",
  location: { x: -1, y: -1 },
};

function Game() {
  const [selectedTile, setSelectedTile] = useState({
    location: { x: -1, y: -1 },
    player: "",
    type: "",
    speed: 0,
    actions: [],
  });
  const [tracker, setTracker] = useState<PlayerTracker>({
    active: "martzcodes",
    initiative: ["martzcodes", "npc"],
    players: initPlayers.reduce((p, c) => {
      return { ...p, [c.name]: new Player(c) };
    }, {} as Record<string, Player>),
  });
  const [rooms] = useState<Record<string, Room>>({
    A: roomA,
    B: roomB,
    C: roomC,
    D: roomD,
    E: roomE,
    F: roomF,
    G: roomG,
  });
  const [board, setBoard] = useState(roomsToBoard(rooms));
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
          const refreshedPlayer = new Player({
            ...player,
            location,
            speed: {
              max: player.speed.max,
              current: speedRemaining,
            },
          });
          const doors = getDoorsFromRooms(rooms);
          const closedDoors = doors.filter(
            (door) => door.startsWith("DL") || door.startsWith("DC")
          );
          closedDoors.forEach((door) => noMove.add(door));
          await refreshedPlayer.processMovement(board, noMove);
          if (refreshedPlayer.speed.current > 0) {
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
        initialized[playerNames[j]] = refreshedPlayer;
      }

      setTracker({
        ...tracker,
        players: initialized,
      });
      setPlayerAction({ ...playerAction, action: "" });
    };

    const openDoor = (doorLoc: Location, destroy: boolean) => {
      const door = board[doorLoc.y][doorLoc.x];
      if (door.startsWith('DL') || door.startsWith('DC')) {
        if (destroy) {
          board[doorLoc.y][doorLoc.x] = `DD${door.slice(2, 4)}`;
        } else {
          board[doorLoc.y][doorLoc.x] = `DO${door.slice(2, 4)}`;
        }
        console.log(`DO${door.slice(2,4)}`);
        setBoard(board);
        setPlayerAction({ ...playerAction, action: "" });
        initializePlayers();
      }
    }

    const closeDoor = (doorLoc: Location) => {
      const door = board[doorLoc.y][doorLoc.x];
      if (door.startsWith("DO")) {
        board[doorLoc.y][doorLoc.x] = `DC${door.slice(2, 4)}`;
        console.log(`DC${door.slice(2, 4)}`);
        setBoard(board);
        setPlayerAction({ ...playerAction, action: "" });
        initializePlayers();
      }
    };

    switch (playerAction.action) {
      case "init":
        initializePlayers();
        break;
      case "skip":
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
      default:
        return;
    }
  }, [playerAction, tracker, board, rooms]);
  return (
    <>
      {tracker ? (
        <Board
          selectedTile={selectedTile}
          setSelectedTile={setSelectedTile}
          tracker={tracker}
          board={board}
        ></Board>
      ) : (
        <></>
      )}
      <div>{`${JSON.stringify(selectedTile)}`}</div>
      {[
        { name: "Skip", type: "skip", color: "red" },
        ...selectedTile.actions,
      ].map((action: Action) => (
        <button
          key={action.type}
          className={`rounded-md font-semibold text-white bg-${action.color}-500 ring-0`}
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
