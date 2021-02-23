import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { Room, RoomProps } from "../Room";
import {
  createGameRoom as createGameRoomMutation,
  updateGameRoom as updateGameRoomMutation,
  deleteGameRoom as deleteGameRoomMutation,
} from "../graphql/mutations";
import RoomForm from "./RoomForm";

const initialRoomFormState: RoomProps = {
  name: "",
  origin: { x: 0, y: 0 },
  height: 0,
  width: 0,
  defaultGroundType: "GRND",
  specialGrounds: [],
};

function RoomEditor({
  rooms: initialRooms,
  create,
}: {
  rooms: Room[];
  create: boolean;
}) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  useEffect(() => {
    setRooms(initialRooms);
  }, [initialRooms]);

  async function upsertRoom(room: RoomProps) {
    if (room.id) {
      updateRoom(
        Object.keys(initialRoomFormState).reduce((p, c) => {
          return { ...p, [c]: (room as any)[c] };
        }, {} as RoomProps)
      );
    } else {
      createRoom(room);
    }
  }

  async function createRoom(room: RoomProps) {
    const res = await API.graphql({
      query: createGameRoomMutation,
      variables: { input: { ...room, gameID: gameId } },
    });
    console.log(res);
    setRooms([...rooms, new Room(room)]);
  }

  async function updateRoom(updatedRoom: RoomProps) {
    const res = await API.graphql({
      query: updateGameRoomMutation,
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
    <>
      <h1>Rooms</h1>
      {rooms.map((room) => (
        <RoomForm
          key={`room-${room.id}`}
          room={room}
          upsertRoom={(roomToUpsert: RoomProps) => {
            upsertRoom(roomToUpsert);
          }}
          deleteRoom={(id: string) => {
            deleteRoom({ id });
          }}
        ></RoomForm>
      ))}
      {create ? (
        <RoomForm
          room={initialRoomFormState}
          upsertRoom={(room: RoomProps) => {
            upsertRoom(room);
          }}
          deleteRoom={() => {}}
        ></RoomForm>
      ) : (
        <></>
      )}
    </>
  );
}

export default RoomEditor;
