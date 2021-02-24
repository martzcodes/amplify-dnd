import { useParams } from "react-router-dom";
import Game, { CharacterTracker } from "./Game";
import { API } from "aws-amplify";
import { getGame } from "./graphql/queries";
import { useEffect, useState } from "react";
import { Character, CharacterProps } from "./Character";
import { Room } from "./Room";
import { Door } from "./Door";
import DMSection from "./DM/DMSection";
import { updateGame as updateGameMutation } from "./graphql/mutations";

export interface DMOptions {
  columnOne: string;
  columnTwo: string;
  debug: boolean;
  create: boolean;
  showPoints: boolean;
}

const sections = ["game", "rooms", "doors", "areas", "characters", "items"];

function DM({ user }: { user: any }) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [game, setGame] = useState<any>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [doors, setDoors] = useState<Door[]>([]);
  const [options, setOptions] = useState<DMOptions>({
    columnOne: "game",
    columnTwo: "characters",
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

  const restoreGame = (apiData: any) => {
    const apiGame = (apiData as any).data.getGame;
    if (apiGame) {
      setGame(apiGame);
      setCharacters(
        apiGame.characters.items.map(
          (characterProps: CharacterProps) => new Character(characterProps)
        )
      );
      setRooms(
        apiGame.rooms.items.map((roomProps: any) => new Room(roomProps))
      );
      setDoors(
        apiGame.doors.items.map((doorProps: any) => new Door(doorProps))
      );
    }
  };

  async function fetchGame(owner: string) {
    const apiData = await API.graphql({
      query: getGame,
      variables: { id: gameId, owner },
    });
    restoreGame(apiData);
  }

  const addToInitiative = async (characterId: string) => {
    if (
      (game.initiative || []).findIndex(
        (initId: string) => initId === characterId
      ) === -1
    ) {
      const apiData = await API.graphql({
        query: updateGameMutation,
        variables: {
          input: {
            id: gameId,
            initiative: [...game.initiative, characterId],
          },
        },
      });
      restoreGame(apiData);
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="flex-none mx-5">
          <div>
            <label
              htmlFor="active_player"
              className="block text-sm font-medium text-gray-700"
            >
              Column One
            </label>
            <select
              name="color"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => {
                setOptions({
                  ...options,
                  columnOne: e.target.value,
                });
              }}
              value={options.columnOne}
            >
              {sections
                .filter((section) => section !== options.columnTwo)
                .map((section) => (
                  <option value={section}>{section}</option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="active_player"
              className="block text-sm font-medium text-gray-700"
            >
              Column Two
            </label>
            <select
              name="color"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => {
                setOptions({
                  ...options,
                  columnTwo: e.target.value,
                });
              }}
              value={options.columnTwo}
            >
              {sections
                .filter((section) => section !== options.columnOne)
                .map((section) => (
                  <option value={section}>{section}</option>
                ))}
            </select>
          </div>
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
        </div>
        <div className="flex-auto">
          <DMSection
            section={options.columnOne}
            options={options}
            game={game}
            rooms={rooms}
            doors={doors}
            characters={characters}
            addToInitiative={(id: string) => addToInitiative(id)}
          ></DMSection>
        </div>
        <div className="flex-auto">
          <DMSection
            section={options.columnTwo}
            options={options}
            game={game}
            rooms={rooms}
            doors={doors}
            characters={characters}
            addToInitiative={(id: string) => addToInitiative(id)}
          ></DMSection>
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
