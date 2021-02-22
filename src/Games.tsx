import { useEffect, useState } from "react";
import { API } from 'aws-amplify';
import { listGames } from "./graphql/queries";
import {
  createGame as createGameMutation,
  deleteGame as deleteGameMutation,
} from "./graphql/mutations";
import { Link } from "react-router-dom";


const initialFormState = { name: "", type: "PUBLIC", dm: "", paused: false };

function Games({ user }: { user: any }) {
  const [games, setGames] = useState<any>([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    const apiData = await API.graphql({ query: listGames });
    setGames((apiData as any).data.listGames.items);
  }

  async function createGame() {
    if (!formData.name) return;
    await API.graphql({
      query: createGameMutation,
      variables: { input: formData },
    });
    setGames([...games, formData]);
    setFormData(initialFormState);
  }

  async function deleteGame({ id }: { id: string }) {
    const newGamesArray = games.filter((game: any) => game.id !== id);
    setGames(newGamesArray);
    await API.graphql({
      query: deleteGameMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        {games.map((game: any) => (
          <div key={game.id || game.name}>
            <h2>{game.name}</h2>
            {game.id && user.username && user.username === game.owner ? (
              <Link to={`/games/${game.id}/dm`}>
                Admin
              </Link>
            ) : (
              <></>
            )}
            {game.id ? (
              <button onClick={() => deleteGame(game)}>Delete game</button>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      <div>
        <h1>Games</h1>
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Game name"
          value={formData.name}
        />
        <button onClick={createGame}>Create Game</button>
      </div>
      <pre>{JSON.stringify(games, null, 2)}</pre>
    </div>
  );
}

export default Games;