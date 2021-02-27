import { useState } from "react";
import { API } from 'aws-amplify';
import {
  createGame as createGameMutation,
} from "./graphql/mutations";
import { GameProps } from "./DM/GameEditor";


const initialFormState = { name: "", type: "PRIVATE", dm: "", paused: false, autoPause: false };

function CreateGame({ addGame }: { addGame: (game: GameProps) => void }) {
  const [formData, setFormData] = useState(initialFormState);

  async function createGame() {
    if (!formData.name) return;
    await API.graphql({
      query: createGameMutation,
      variables: { input: formData },
    });
    setFormData(initialFormState);
  }

  return (
    <div>
      <div>
        <h1>Create a Game</h1>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Game name"
          value={formData.name}
        />
        <button
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={createGame}
        >
          Create Game
        </button>
      </div>
    </div>
  );
}

export default CreateGame;