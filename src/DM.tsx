import { useParams } from "react-router-dom";
import Game, { CharacterTracker } from "./Game";
import { API, graphqlOperation } from "aws-amplify";
import { getGame } from "./graphql/queries";
import { useEffect, useState } from "react";
import { Character, CharacterProps } from "./Character";
import { Room } from "./Room";
import { Door } from "./Door";
import DMSection from "./DM/DMSection";
import { updateGame as updateGameMutation } from "./graphql/mutations";
import { onUpdateGame } from "./graphql/subscriptions";
import Observable from "zen-observable";
import { AreaProps } from "./Area";
import { GameProps } from "./DM/GameEditor";

export interface DMOptions {
  columnOne: string;
  columnTwo: string;
  debug: boolean;
  showPoints: boolean;
}

const sections = ["game", "rooms", "doors", "areas", "characters"];

function DM({ user }: { user: any }) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [game, setGame] = useState<GameProps>({
    id: "temp",
    name: "name",
    type: "PRIVATE",
    joinPassword: "",
    paused: true,
    autoPause: true,
    active: "",
    initiative: [],
    characters: [],
    rooms: [],
    doors: [],
    areas: [],
  });
  const [options, setOptions] = useState<DMOptions>({
    columnOne: "game",
    columnTwo: "characters",
    debug: false,
    showPoints: false,
  });

  useEffect(() => {
    fetchGame();
    const subscription = API.graphql(
      graphqlOperation(onUpdateGame, { input: { id: gameId } })
    );
    if (subscription instanceof Observable) {
      const subscribed = subscription.subscribe({
        next: (apiData) => {
          const apiGame = (apiData as any).value.data.onUpdateGame;
          if (apiGame.id === gameId) {
            restoreGame(apiGame);
          }
        },
      });
      return () => {
        subscribed.unsubscribe();
      };
    }
  }, []);

  const restoreGame = (apiGame: any) => {
    if (apiGame) {
      const updatedGame: GameProps = { ...apiGame };

      updatedGame.characters =
        apiGame.characters && apiGame.characters.items
          ? apiGame.characters.items.map(
              (characterProps: CharacterProps) => new Character(characterProps)
            )
          : [];
      updatedGame.rooms =
        apiGame.rooms && apiGame.rooms.items
          ? apiGame.rooms.items.map((roomProps: any) => new Room(roomProps))
          : [];
      updatedGame.doors =
        apiGame.doors && apiGame.doors.items
          ? apiGame.doors.items.map((doorProps: any) => new Door(doorProps))
          : [];
      updatedGame.areas =
        apiGame.areas && apiGame.areas.items
          ? apiGame.areas.items.map((areaProps: any) => areaProps as AreaProps)
          : [];
      setGame(updatedGame);
    }
  };

  const fetchGame = async () => {
    const owner = user.username;
    if (owner) {
      const apiData = await API.graphql({
        query: getGame,
        variables: { id: gameId, owner },
      });
      const apiGame = (apiData as any).data.getGame;
      restoreGame(apiGame);
    }
  };

  const addToInitiative = async (characterId: string) => {
    if (!game.initiative) {
      game.initiative = [];
    }
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
      const apiGame = (apiData as any).data.getGame;
      restoreGame(apiGame);
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
                  <option value={section} key={`col-one-${section}`}>
                    {section}
                  </option>
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
                  <option value={section} key={`col-two-${section}`}>
                    {section}
                  </option>
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
              <span className="ml-2 text-gray-700">Debug</span>
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
              <span className="ml-2 text-gray-700">Show Points</span>
            </label>
          </div>
        </div>
        <div className="flex-auto">
          <DMSection
            section={options.columnOne}
            options={options}
            game={game}
            addToInitiative={(id: string) => addToInitiative(id)}
          ></DMSection>
        </div>
        <div className="flex-auto">
          <DMSection
            section={options.columnTwo}
            options={options}
            game={game}
            addToInitiative={(id: string) => addToInitiative(id)}
          ></DMSection>
        </div>
      </div>
      <Game dm={true} showPoints={options.showPoints} game={game}></Game>
      {options.debug ? (
        <div>
          <pre>{JSON.stringify(game, null, 2)}</pre>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DM;
