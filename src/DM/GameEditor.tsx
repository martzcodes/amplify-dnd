import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { updateGame as updateGameMutation } from "../graphql/mutations";
import { Character } from "../Character";
import GameInitiativeEditor from "./GameInitiativeEditor";

export interface GameProps {
  id: string;
  name: string;
  type: "PUBLIC" | "PRIVATE";
  joinPassword: string;
  paused: boolean;
  autoPause: boolean;
  active: string;
  initiative: string[];
  characters: Character[];
  owner?: string;
  rooms: [];
  doors: [];
  areas: [];
}

const characterInitiative = (
  characters: Character[],
  initiative: string[] = []
): Character[] => {
  if (initiative) {
    return initiative.reduce((init, id) => {
      const character = characters.find((character) => character.id === id);
      if (character) {
        return [...init, character];
      }
      return init;
    }, [] as Character[]);
  }
  return [];
};

function GameEditor({
  game: serverGame,
  characters,
}: {
  game: GameProps;
  characters: Character[];
}) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [gameFormData, setGameFormData] = useState(serverGame);

  useEffect(() => {
    setGameFormData(serverGame);
  }, [serverGame]);

  const updateGame = async (updatedGame: GameProps) => {
    await API.graphql({
      query: updateGameMutation,
      variables: {
        input: {
          id: gameId,
          name: updatedGame.name,
          type: updatedGame.type,
          joinPassword: updatedGame.joinPassword,
          paused: updatedGame.paused,
          autoPause: updatedGame.autoPause,
          active: updatedGame.active,
          initiative: updatedGame.initiative,
        },
      },
    });
  }

  return (
    <>
      <h1>Game</h1>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label
            htmlFor="game_name"
            className="block text-sm font-medium text-gray-700"
          >
            Game Name
          </label>
          <input
            type="text"
            name="game_name"
            onChange={(e) =>
              setGameFormData({ ...gameFormData, name: e.target.value })
            }
            value={gameFormData.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="col-span-3">
          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={gameFormData.type === "PUBLIC"}
              onChange={(e) => {
                setGameFormData({
                  ...gameFormData,
                  type: gameFormData.type === "PUBLIC" ? "PRIVATE" : "PUBLIC",
                });
              }}
            />
            <span className="ml-2 text-gray-700">Public</span>
          </label>
        </div>
        <div className="col-span-3">
          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={gameFormData.autoPause}
              onChange={(e) => {
                setGameFormData({
                  ...gameFormData,
                  autoPause: !gameFormData.autoPause,
                });
              }}
            />
            <span className="ml-2 text-gray-700">Auto-Pause</span>
          </label>
        </div>
        <div className="col-span-6">
          <label
            htmlFor="active_player"
            className="block text-sm font-medium text-gray-700"
          >
            Active Player
          </label>
          <select
            name="color"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => {
              setGameFormData({
                ...gameFormData,
                active: e.target.value,
              });
            }}
            value={gameFormData.active}
          >
            {characterInitiative(characters, gameFormData.initiative || []).map(
              (character) => (
                <option value={character.id} key={character.id}>
                  {character.name}
                </option>
              )
            )}
          </select>
        </div>
        <div className="col-span-6">
          <GameInitiativeEditor
            active={gameFormData.active}
            characters={characterInitiative(
              characters,
              gameFormData.initiative
            )}
            updateInitiative={(characters: Character[]) => {
              updateGame({
                ...gameFormData,
                initiative: characters.map((character) => character.id),
              });
            }}
          ></GameInitiativeEditor>
        </div>
      </div>
      <button
        onClick={() => {
          updateGame(gameFormData);
        }}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
      <button
        onClick={() => {
          updateGame({...gameFormData, paused: !gameFormData.paused});
        }}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        { gameFormData.paused ? 'Unpause' : 'Pause' }
      </button>
    </>
  );
}

export default GameEditor;
