import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteGame as deleteGameMutation } from "./graphql/mutations";
import GamesList from "./GamesList";
import GameCharacterList from "./GameCharacterList";
import { Character, CharacterProps } from "./Character";
import { GameProps } from "./DM/GameEditor";
import CreateGame from "./CreateGame";
import { listGames } from "./graphql/queries";

function Games({ user }: { user: any }) {
  const [games, setGames] = useState<any>([]);
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    if (user && user.username) {
      fetchOwnedGames(user.username);
    }
  }, [user]);

  async function fetchOwnedGames(owner: string) {
    const apiData = await API.graphql(
      graphqlOperation(listGames, {
        filter: { dm: { eq: owner } },
      })
    );
    const games = (apiData as any).data.listGames.items.map((game: any) => {
      return {
        ...game,
        characters: game.characters.items.map(
          (character: CharacterProps) => new Character(character)
        ),
      };
    });
    setGames(games);
  }

  const deleteGame = async ({ id }: { id: string }) => {
    const newGamesArray = games.filter((game: any) => game.id !== id);
    setGames(newGamesArray);
    await API.graphql({
      query: deleteGameMutation,
      variables: { input: { id } },
    });
  };

  const viewCharacters = async (game: GameProps) => {
    setGame(game);
  };

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
      {games.length === 0 ? (
        <CreateGame
          owner={user.username}
          refresh={() => {
            fetchOwnedGames(user.username);
          }}
        ></CreateGame>
      ) : (
        <div>
          Only one game per user, for now.  Let me know if you need more <a href="https://twitter.com/martzcodes">@martzcodes</a>
        </div>
      )}
    </div>
  );
}

export default Games;
