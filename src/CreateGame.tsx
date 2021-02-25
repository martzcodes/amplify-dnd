import { useState } from "react";
import { API } from 'aws-amplify';
import {
  createGame as createGameMutation,
} from "./graphql/mutations";


const initialFormState = { name: "", type: "PUBLIC", dm: "", paused: false };

function CreateGame({ user }: { user: any }) {
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
        <h1>Games</h1>
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Game name"
          value={formData.name}
        />
        <button onClick={createGame}>Create Game</button>
      </div>
    </div>
  );
}

export default CreateGame;