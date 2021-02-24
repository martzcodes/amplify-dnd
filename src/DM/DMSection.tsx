import { Character } from "../Character";
import { DMOptions } from "../DM";
import { Door } from "../Door";
import { Room } from "../Room";
import CharacterEditor from "./CharacterEditor";
import DoorEditor from "./DoorEditor";
import GameEditor from "./GameEditor";
import RoomEditor from "./RoomEditor";

function DMSection({
  section,
  game,
  options,
  rooms,
  doors,
  characters,
  addToInitiative,
}: {
  section: string;
  game: any;
  options: DMOptions;
  rooms: Room[];
  doors: Door[];
  characters: Character[];
  addToInitiative: any;
}) {
  return (
    <>
      {section === "game" ? (
        <div>
          <GameEditor game={game} characters={characters}></GameEditor>
          {options.debug ? <pre>{JSON.stringify(game, null, 2)}</pre> : <></>}
        </div>
      ) : (
        <></>
      )}
      {section === "rooms" ? (
        <div>
          <RoomEditor rooms={rooms} create={options.create}></RoomEditor>
          {options.debug ? <pre>{JSON.stringify(rooms, null, 2)}</pre> : <></>}
        </div>
      ) : (
        <></>
      )}
      {section === "doors" ? (
        <div>
          <DoorEditor doors={doors} create={options.create}></DoorEditor>
          {options.debug ? <pre>{JSON.stringify(doors, null, 2)}</pre> : <></>}
        </div>
      ) : (
        <></>
      )}
      {section === "characters" ? (
        <div>
          <CharacterEditor
            characters={characters}
            create={options.create}
            addToInitiative={(id: string) => addToInitiative(id)}
            game={game}
          ></CharacterEditor>
          {options.debug ? (
            <pre>{JSON.stringify(characters, null, 2)}</pre>
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

export default DMSection;
