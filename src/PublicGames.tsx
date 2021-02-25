import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { deleteGame as deleteGameMutation } from "./graphql/mutations";
import { listPublicGames } from "./customQueries";
import GamesList from "./GamesList";
import { Character, CharacterProps } from "./Character";
import { GameProps } from "./DM/GameEditor";
import GameCharacterList from "./GameCharacterList";

function PublicGames({ user }: { user: any }) {
  const [games, setGames] = useState<any>([]);
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    fetchPublicGames();
  }, [user]);

  async function fetchPublicGames() {
    const apiData = await API.graphql({
      query: listPublicGames,
      variables: { type: "PUBLIC" },
    });
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

  const viewCharacters = async (game: GameProps) => {
    setGame(game);
  };

  return (
    <div className="flex">
      <div className="flex-auto">
        <GamesList
          games={games}
          deleteGame={(id: string) => {}}
          viewCharacters={(game: GameProps) =>
            viewCharacters(game)
          }
          user={(user || {}).username}
        ></GamesList>
      </div>
      <div className="flex-auto">
        {game ? <GameCharacterList game={game}></GameCharacterList> : <></>}
      </div>
    </div>
  );
}

export default PublicGames;
