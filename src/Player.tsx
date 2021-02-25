import { useParams } from "react-router-dom";
import Game, { CharacterTracker } from "./Game";
import { API, graphqlOperation } from "aws-amplify";
import { getGame } from "./graphql/queries";
import { useEffect, useState } from "react";
import { Character, CharacterProps } from "./Character";
import { Room } from "./Room";
import { Door } from "./Door";
import DMSection from "./DM/DMSection";
import { updateGame as updateGameMutation } from "./graphql/mutations";
import { onUpdateGame } from "./graphql/subscriptions";
import Observable from "zen-observable";

function Player({ user }: { user: any }) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [game, setGame] = useState<any>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [doors, setDoors] = useState<Door[]>([]);
  const [tracker, setTracker] = useState<CharacterTracker>({
    active: "",
    initiative: [],
    characters: characters,
  });

  const subscribeGame = async () => {
    const subscription = await API.graphql(
      graphqlOperation(onUpdateGame, { input: { id: gameId } })
    );
    if (subscription instanceof Observable) {
      subscription.subscribe({
        next: (apiData) => {
          const apiGame = (apiData as any).value.data.onUpdateGame;
          console.log(apiGame);
          if (apiGame.id === gameId) {
            restoreGame(apiGame);
          }
        },
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchGame();
      subscribeGame();
    }
  }, [user]);

  useEffect(() => {
    if (game.active && characters.length) {
      setTracker({
        active: game.active || "",
        initiative: game.initiative || [],
        characters: characters,
      });
    }
  }, [game, characters]);

  const restoreGame = (apiGame: any) => {
    if (apiGame) {
      console.log(apiGame);
      setGame(apiGame);
      setCharacters(
        apiGame.characters.items.map(
          (characterProps: CharacterProps) => new Character(characterProps)
        )
      );
      setRooms(
        apiGame.rooms.items.map((roomProps: any) => new Room(roomProps))
      );
      setDoors(
        apiGame.doors.items.map((doorProps: any) => new Door(doorProps))
      );
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

  return user && user.username ? (
    <Game
      rooms={rooms}
      doors={doors}
      tracker={tracker}
      paused={game.paused}
      user={user?.username}
    ></Game>
  ) : (
    <></>
  );
}

export default Player;
