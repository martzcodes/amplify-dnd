import { useEffect, useState } from "react";
import Board from "./Board";
import "./Game.css";
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

const noMove = new Set([
  "wall",
  "WALL",
  "void",
  "VOID",
  "door-closed",
  "door-locked",
  "player",
]);

const initialPlayerProps: PlayerProps = {
  name: "martzcodes",
  location: {
    x: 0,
    y: 8,
  },
  speed: 30,
  vision: 50,
};

function Game() {
  const [selectedTile, setSelectedTile] = useState({
    location: { x: -1, y: -1 },
    type: "",
    speed: 0,
    actions: [],
  });
  const [playerProps, setPlayerProps] = useState(initialPlayerProps);
  const [player, setPlayer] = useState<Player>();
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
    const generatePlayer = async () => {
      const generatedPlayer = new Player(playerProps);
      generatedPlayer.addBoard(board);
      const doors = getDoorsFromRooms(rooms);
      const closedDoors = doors.filter(
        (door) => door.startsWith("DL") || door.startsWith("DC")
      );
      closedDoors.forEach((door) => noMove.add(door));
      await generatedPlayer.processMovement(board, noMove);
      setPlayer(generatedPlayer);
    };

    generatePlayer();
  }, [playerProps, board]);

  useEffect(() => {
    console.log(selectedTile);
    const movePlayer = async () => {
      if (player && selectedTile.actions.length) {
        console.log('has player...');
        if (player.location.x !== selectedTile.location.x || player.location.y !== selectedTile.location.y) {
          const refreshedPlayer = new Player({...player, location: selectedTile.location});
          const doors = getDoorsFromRooms(rooms);
          const closedDoors = doors.filter(
            (door) => door.startsWith("DL") || door.startsWith("DC")
          );
          closedDoors.forEach((door) => noMove.add(door));
          await refreshedPlayer.processMovement(board, noMove);
          setPlayer(refreshedPlayer);
        }
      }
    };
    movePlayer();
  }, [selectedTile, player]);
  return (
    <>
      {player ? (
        <Board
          selectedTile={selectedTile}
          setSelectedTile={setSelectedTile}
          player={player}
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
