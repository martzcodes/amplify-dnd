import { useEffect, useState } from "react";
import { Door } from "./Door";
import InteractionLayer from "./InteractionLayer";
import { Location } from "./models/Location";
import { Character } from "./Character";

const emptyTile = {
  location: { x: -1, y: -1 },
  character: "",
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
  content?: string;
}

function UserLayer({
  board,
  doors,
  character,
  updateCharacter,
  renderable,
  dm,
  showPoints,
}: {
  board: string[][];
  doors: Door[];
  character: Character;
  updateCharacter: any;
  renderable?: Renderable[];
  dm?: boolean;
  showPoints?: boolean;
}) {
  const [selectedTile, setSelectedTile] = useState(emptyTile);

  useEffect(() => {
    if ( character && (
      !character.selectedTile ||
      selectedTile.location.x !== character.selectedTile.location.x ||
      selectedTile.location.y !== character.selectedTile.location.y
    )) {
      const updatedCharacter = new Character({ ...character });
      updatedCharacter.selectedTile = selectedTile;
      updateCharacter(updatedCharacter);
      return;
    }
  }, [selectedTile]);

  return board.length ? (
    <InteractionLayer
      selectedTile={selectedTile}
      setSelectedTile={setSelectedTile}
      width={board[0].length}
      height={board.length}
      doors={doors}
      character={character}
      renderable={renderable || []}
      showPoints={showPoints}
      dm={dm}
    ></InteractionLayer>
  ) : <></>;
}

export default UserLayer;
