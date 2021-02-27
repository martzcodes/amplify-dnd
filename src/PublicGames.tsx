import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
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

  const fetchPublicGames = async () => {
    try {
      const apiData = await API.graphql(
        graphqlOperation(listPublicGames, {
          filter: { type: { eq: "PUBLIC" } },
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
    } catch (e) {
      console.log(e);
    }
  };

  const viewCharacters = async (game: GameProps) => {
    setGame(game);
  };

  return (
    <div>
      <div>These are "public" games. Click the "eye" icon to see a list of characters and then click the link button to go into that character's view.  From there you can take actions and expore.</div>
      <div className="flex">
        <div className="flex-auto">
          <GamesList
            games={games}
            deleteGame={(id: string) => {}}
            viewCharacters={(game: GameProps) => viewCharacters(game)}
            user={(user || {}).username}
          ></GamesList>
        </div>
        <div className="flex-auto">
          {game ? <GameCharacterList game={game}></GameCharacterList> : <></>}
        </div>
      </div>
    </div>
  );
}

export default PublicGames;
