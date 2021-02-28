import { useParams } from "react-router-dom";
import Game, { CharacterTracker } from "./Game";
import { API, graphqlOperation } from "aws-amplify";
import { getGame } from "./graphql/queries";
import { useEffect, useState } from "react";
import { Character, CharacterProps } from "./Character";
import { Room } from "./Room";
import { Door } from "./Door";
import { onUpdateGame } from "./graphql/subscriptions";
import Observable from "zen-observable";
import { AreaProps } from "./Area";
import { GameProps } from "./DM/GameEditor";

function Player({ user }: { user: any }) {
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
        error: (err) => {
          console.error(err);
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
          ? apiGame.doors.items
              .map((doorProps: any) => new Door(doorProps))
              .filter((door: Door) => !door.hidden)
          : [];
      updatedGame.areas =
        apiGame.areas && apiGame.areas.items
          ? apiGame.areas.items
              .map((areaProps: any) => areaProps as AreaProps)
              .filter((areaProps: AreaProps) => areaProps.enabled)
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

  return user && user.username ? <Game game={game}></Game> : <></>;
}

export default Player;
