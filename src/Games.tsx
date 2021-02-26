import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { deleteGame as deleteGameMutation } from "./graphql/mutations";
import { listPublicGames } from "./customQueries";
import GamesList from "./GamesList";
import GameCharacterList from "./GameCharacterList";
import { Character, CharacterProps } from "./Character";
import { GameProps } from "./DM/GameEditor";
import CreateGame from "./CreateGame";

function Games({ user }: { user: any }) {
  const [games, setGames] = useState<any>([]);
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    if (user && user.username) {
      fetchOwnedGames(user.username);
    }
  }, [user]);

  async function fetchOwnedGames(owner: string) {
    const apiData = await API.graphql({
      query: listPublicGames,
      variables: { type: "PRIVATE", owner },
    });
    const games = (apiData as any).data.listGames.items.map((game: any) => {
      return { ...game, characters: game.characters.items.map((character: CharacterProps) => new Character(character))};
    })
    setGames(games);
  }

  const deleteGame = async ({ id }: { id: string }) => {
    const newGamesArray = games.filter((game: any) => game.id !== id);
    setGames(newGamesArray);
    await API.graphql({
      query: deleteGameMutation,
      variables: { input: { id } },
    });
  }

  const viewCharacters = async (game: GameProps) => {
    setGame(game);
  }

  return (
    <div>
      <div className="flex">
        <div className="flex-auto">
          <GamesList
            games={games}
            deleteGame={(id: string) => {
              deleteGame({ id });
            }}
            viewCharacters={(game: GameProps) => viewCharacters(game)}
            user={user.username || ""}
          ></GamesList>
        </div>
        <div className="flex-auto">
          {game ? <GameCharacterList game={game}></GameCharacterList> : <></>}
        </div>
      </div>
      <CreateGame addGame={(game: GameProps) => {
        setGames([...games, game]);
      }}></CreateGame>
    </div>
  );
}

export default Games;
