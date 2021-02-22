import { useParams } from "react-router-dom";
import Game from "./Game";
import { API } from "aws-amplify";
import { getGame } from "./graphql/queries";
import { useEffect, useState } from "react";
import { Character, CharacterProps } from "./Character";
import { Room, RoomProps } from "./Room";
import { Door } from "./Door";
import {
  createGameRoom as createGameRoomMutation,
  updateGameRoom as updateGameRoomMutation,
  deleteGameRoom as deleteGameRoomMutation,
} from "./graphql/mutations";
import RoomForm from "./DM/RoomForm";

const initialRoomFormState: RoomProps = {
  name: "",
  origin: { x: 0, y: 0 },
  height: 0,
  width: 0,
  defaultGroundType: "GRND",
  specialGrounds: [],
};

function DM({ user }: { user: any }) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [game, setGame] = useState<any>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [doors, setDoors] = useState<Door[]>([]);

  useEffect(() => {
    if (user) {
      fetchGame(user.username);
    }
  }, [user]);

  async function fetchGame(owner: string) {
    console.log(gameId);
    console.log(user);
    const apiData = await API.graphql({
      query: getGame,
      variables: { id: gameId, owner },
    });
    const game = (apiData as any).data.getGame;
    if (game) {
      setGame(game);
      setCharacters(
        game.characters.items.map(
          (characterProps: CharacterProps) => new Character(characterProps)
        )
      );
      setRooms(game.rooms.items.map((roomProps: any) => new Room(roomProps)));
      setDoors(game.doors.items.map((doorProps: any) => new Door(doorProps)));
    }
  }

  async function upsertRoom(room: RoomProps) {
    console.log(room);
    if (room.id) {
      updateRoom(room);
    } else {
      createRoom(room);
    }
  }

  async function createRoom(room: RoomProps) {
    const res = await API.graphql({
      query: createGameRoomMutation,
      variables: { input: {...room, gameID: gameId} },
    });
    console.log(res);
    setRooms([...rooms, new Room(room)]);
  }

  async function updateRoom(updatedRoom: RoomProps) {
    const res = await API.graphql({
      query: createGameRoomMutation,
      variables: { input: { ...updatedRoom, gameID: gameId } },
    });
    console.log(res);
    const newRoomsArray = rooms.filter(
      (room: any) => room.id !== updatedRoom.id
    );
    setRooms(newRoomsArray);
    setRooms([...newRoomsArray, new Room(updatedRoom)]);
  }

    async function deleteRoom({ id }: { id: string }) {
      const newRoomsArray = rooms.filter((room: any) => room.id !== id);
      setRooms(newRoomsArray);
      await API.graphql({
        query: deleteGameRoomMutation,
        variables: { input: { id } },
      });
    }

  return (
    <div>
      <div className="flex">
        <div className="flex-1">
          <h1>Game</h1>
          <pre>{JSON.stringify(game, null, 2)}</pre>
        </div>
        <div className="flex-1">
          <h1>Rooms</h1>
          <RoomForm
            room={initialRoomFormState}
            upsertRoom={(room: RoomProps) => {
              upsertRoom(room);
            }}
            deleteRoom={() => {}}
          ></RoomForm>
          {rooms.map((room) => (
            <RoomForm key={room.name}
              room={room}
              upsertRoom={(roomToUpsert: RoomProps) => {
                upsertRoom(roomToUpsert);
              }}
              deleteRoom={(id: string) => {
                deleteRoom({id});
              }}
            ></RoomForm>
          ))}
          <pre>{JSON.stringify(rooms, null, 2)}</pre>
        </div>
        <div className="flex-1">
          <h1>Doors</h1>
          <pre>{JSON.stringify(doors, null, 2)}</pre>
        </div>
        <div className="flex-1">
          <h1>Characters</h1>
          <pre>{JSON.stringify(characters, null, 2)}</pre>
        </div>
      </div>
      <Game dm={true} rooms={rooms}></Game>
    </div>
  );
}

export default DM;
