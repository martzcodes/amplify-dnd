import { useEffect, useState } from "react";
import { Door } from "./Door";
import InteractionLayer from "./InteractionLayer";
import { Location } from "./models/Location";
import { Player } from "./Player";

const emptyTile = {
  location: { x: -1, y: -1 },
  player: "",
  type: "",
  speed: 0,
  actions: [],
};

export interface Renderable {
  name: string;
  class: string;
  location: Location;
  description: string;
  actions: string[];
}

function UserLayer({
  board,
  doors,
  player,
  updatePlayer,
  renderable,
  dm,
}: {
  board: string[][];
  doors: Door[];
  player: Player;
  updatePlayer: any;
  renderable?: Renderable[];
  dm?: boolean;
}) {
  console.log(player.id);
  const [selectedTile, setSelectedTile] = useState(emptyTile);

  useEffect(() => {
    if (
      !player.selectedTile ||
      selectedTile.location.x !== player.selectedTile.location.x ||
      selectedTile.location.y !== player.selectedTile.location.y
    ) {
      const updatedPlayer = new Player({ ...player });
      updatedPlayer.selectedTile = selectedTile;
      updatePlayer(updatedPlayer);
      return;
    }
  }, [selectedTile]);

  return (
    <InteractionLayer
      selectedTile={selectedTile}
      setSelectedTile={setSelectedTile}
      width={board[0].length}
      height={board.length}
      doors={doors}
      player={player}
      renderable={renderable || []}
      dm={dm}
    ></InteractionLayer>
  );
}

export default UserLayer;
