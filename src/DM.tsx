import { useParams } from "react-router-dom";
import Game, { CharacterTracker } from "./Game";
import { API } from "aws-amplify";
import { getGame } from "./graphql/queries";
import { useEffect, useState } from "react";
import { Character, CharacterProps } from "./Character";
import { Room } from "./Room";
import { Door } from "./Door";
import RoomEditor from "./DM/RoomEditor";
import DoorEditor from "./DM/DoorEditor";
import CharacterEditor from "./DM/CharacterEditor";
import GameEditor from "./DM/GameEditor";

function DM({ user }: { user: any }) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [game, setGame] = useState<any>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [doors, setDoors] = useState<Door[]>([]);
  const [options, setOptions] = useState<{
    debug: boolean;
    create: boolean;
    showPoints: boolean;
  }>({
    debug: false,
    create: false,
    showPoints: false,
  });
  const [tracker, setTracker] = useState<CharacterTracker>({
    active: "",
    initiative: [],
    characters: characters,
  });

  useEffect(() => {
    if (user) {
      fetchGame(user.username);
    }
  }, [user]);

  useEffect(() => {
    if (game.active && characters.length) {
      setTracker({
        active: game.active || "",
        initiative: game.initiative || [],
        characters: characters,
      });
    }
  }, [game, characters]);

  async function fetchGame(owner: string) {
    console.log(gameId);
    console.log(user);
    const apiData = await API.graphql({
      query: getGame,
      variables: { id: gameId, owner },
    });
    const game = (apiData as any).data.getGame;
    if (game) {
      setGame(game);
      setCharacters(
        game.characters.items.map(
          (characterProps: CharacterProps) => new Character(characterProps)
        )
      );
      setRooms(game.rooms.items.map((roomProps: any) => new Room(roomProps)));
      setDoors(game.doors.items.map((doorProps: any) => new Door(doorProps)));
    }
  }

  return (
    <div>
      <div className="flex">
        <div className="flex-1">
          <h1>Options</h1>
          <div>
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={options.debug}
                onChange={(e) =>
                  setOptions({ ...options, debug: !options.debug })
                }
              />
              <span className="ml-2 text-gray-700">Debug?</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={options.create}
                onChange={(e) =>
                  setOptions({ ...options, create: !options.create })
                }
              />
              <span className="ml-2 text-gray-700">Create?</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={options.showPoints}
                onChange={(e) =>
                  setOptions({ ...options, showPoints: !options.showPoints })
                }
              />
              <span className="ml-2 text-gray-700">Show Points?</span>
            </label>
          </div>
          <div>
            <GameEditor game={game}></GameEditor>
            {options.debug ? <pre>{JSON.stringify(game, null, 2)}</pre> : <></>}
          </div>
        </div>
        <div className="flex-1">
          <RoomEditor rooms={rooms} create={options.create}></RoomEditor>
          {options.debug ? <pre>{JSON.stringify(rooms, null, 2)}</pre> : <></>}
        </div>
        <div className="flex-1">
          <DoorEditor doors={doors} create={options.create}></DoorEditor>
          {options.debug ? <pre>{JSON.stringify(doors, null, 2)}</pre> : <></>}
        </div>
        <div className="flex-1">
          <CharacterEditor
            characters={characters}
            create={options.create}
          ></CharacterEditor>
          {options.debug ? (
            <pre>{JSON.stringify(characters, null, 2)}</pre>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Game
        dm={true}
        rooms={rooms}
        doors={doors}
        showPoints={options.showPoints}
        tracker={tracker}
      ></Game>
    </div>
  );
}

export default DM;
