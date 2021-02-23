import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { updateGame as updateGameMutation } from "../graphql/mutations";

interface GameProps {
  id: string;
  name: string;
  type: "PUBLIC" | "PRIVATE";
  joinPassword: string;
  paused: boolean;
  active: string;
  initiative: string[];
}

function GameEditor({ game: serverGame }: { game: GameProps }) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [gameFormData, setGameFormData] = useState(serverGame);
  const [nextInitiative, setNextInitiative] = useState("");

  useEffect(() => {
    setGameFormData(serverGame);
  }, [serverGame]);

  async function updateGame(updatedGame: GameProps) {
    const res = await API.graphql({
      query: updateGameMutation,
      variables: {
        input: {
          id: gameId,
          name: updatedGame.name,
          type: updatedGame.type,
          joinPassword: updatedGame.joinPassword,
          paused: updatedGame.paused,
          active: updatedGame.active,
          initiative: updatedGame.initiative,
        },
      },
    });
    console.log(res);
    setGameFormData(updatedGame);
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
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6">
          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={gameFormData.paused}
              onChange={(e) => {
                setGameFormData({
                  ...gameFormData,
                  paused: !gameFormData.paused,
                });
              }}
            />
            <span className="ml-2 text-gray-700">Paused?</span>
          </label>
        </div>
        <div className="col-span-6">
          <label
            htmlFor="active_player"
            className="block text-sm font-medium text-gray-700"
          >
            Active Player
          </label>
          <input
            type="text"
            name="active_player"
            onChange={(e) =>
              setGameFormData({ ...gameFormData, active: e.target.value })
            }
            value={gameFormData.active}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="next_initiative"
            className="block text-sm font-medium text-gray-700"
          >
            Add Player to End of Initiative
          </label>
          <input
            type="text"
            name="next_initiative"
            onChange={(e) => setNextInitiative(e.target.value)}
            value={nextInitiative}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          <button
            onClick={() => {
              const updatedGame = { ...gameFormData };
              if (!updatedGame.initiative) {
                updatedGame.initiative = [];
              }
              updatedGame.initiative.push(nextInitiative);
              setGameFormData(updatedGame);
              setNextInitiative("");
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
        <div className="col-span-6">{`${(gameFormData.initiative || [])
          .map((init) => `"${init}"`)
          .join(" ,")}`}</div>
      </div>
      <button
        onClick={() => {
          updateGame(gameFormData);
        }}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </>
  );
}

export default GameEditor;
