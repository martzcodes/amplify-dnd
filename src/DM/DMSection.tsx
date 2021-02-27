import { DMOptions } from "../DM";
import AreaEditor from "./AreaEditor";
import CharacterEditor from "./CharacterEditor";
import DoorEditor from "./DoorEditor";
import GameEditor, { GameProps } from "./GameEditor";
import RoomEditor from "./RoomEditor";

function DMSection({
  section,
  game,
  options,
  addToInitiative,
}: {
  section: string;
  game: GameProps;
  options: DMOptions;
  addToInitiative: (id: string) => {};
}) {
  return (
    <>
      {section === "game" ? (
        <div>
          <GameEditor game={game} characters={game.characters}></GameEditor>
          {options.debug ? <pre>{JSON.stringify(game, null, 2)}</pre> : <></>}
        </div>
      ) : (
        <></>
      )}
      {section === "rooms" ? (
        <div>
          <RoomEditor rooms={game.rooms}></RoomEditor>
        </div>
      ) : (
        <></>
      )}
      {section === "doors" ? (
        <div>
          <DoorEditor doors={game.doors}></DoorEditor>
        </div>
      ) : (
        <></>
      )}
      {section === "characters" ? (
        <div>
          <CharacterEditor
            characters={game.characters}
            addToInitiative={(id: string) => addToInitiative(id)}
            game={game}
          ></CharacterEditor>
        </div>
      ) : (
        <></>
      )}
      {section === "areas" ? (
        <div>
          <AreaEditor
            areas={game.areas}
            addToInitiative={(id: string) => addToInitiative(id)}
            game={game}
          ></AreaEditor>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default DMSection;
