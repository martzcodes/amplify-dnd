import { useEffect, useState } from "react";
import Board from "./Board";
import "./Game.css";
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
    color: "bg-blue-600",
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
    color: "bg-purple-600",
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
  const [board] = useState(roomsToBoard(rooms));

  useEffect(() => {
    const movePlayer = async (location: Location) => {
      const speedRemaining =
        player.speed.current -
        player.movement.cost[hashLocation(location)];
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
          setTracker({
            ...tracker,
            players: {
              ...tracker.players,
              [refreshedPlayer.name]: refreshedPlayer,
            },
          });
        } else {
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
          setTracker({
            ...tracker,
            active: tracker.initiative[nextActiveInd],
            players: {
              ...tracker.players,
              [refreshedPlayer.name]: refreshedPlayer,
              [nextPlayerName]: nextPlayer,
            },
          });
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
    };

    const player = tracker.players[tracker.active];
    if (player && player.visible.size === 0) {
      initializePlayers();
    }
    if (
      player &&
      selectedTile.actions.length &&
      selectedTile.player === player.name
    ) {
      if (
        player.location.x !== selectedTile.location.x ||
        player.location.y !== selectedTile.location.y
      ) {
        movePlayer(selectedTile.location);
      }
    }
  }, [selectedTile, tracker, board, rooms]);
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
      <p>{`${JSON.stringify(selectedTile)}`}</p>
    </>
  );
}

export default Game;
