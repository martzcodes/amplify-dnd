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
import RoomList from "./RoomList";

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
  const [roomForm, setRoomForm] = useState<RoomProps>(initialRoomFormState);

  useEffect(() => {
    setRooms(initialRooms);
  }, [initialRooms]);

  async function upsertRoom(room: RoomProps) {
    if (room.id) {
      updateRoom(
        Object.keys(initialRoomFormState).reduce(
          (p, c) => {
            return { ...p, [c]: (room as any)[c] };
          },
          { id: room.id } as RoomProps
        )
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
    setRooms([...newRoomsArray, new Room(updatedRoom)]);
    setRoomForm(initialRoomFormState);
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
      <RoomList
        rooms={rooms}
        editRoom={(room: Room) => {
          setRoomForm({...room});
        }}
        deleteRoom={(id: string) => deleteRoom({ id })}
      ></RoomList>
      {create || roomForm.id ? (
        <RoomForm
          room={roomForm}
          upsertRoom={(room: RoomProps) => {
            upsertRoom(room);
          }}
        ></RoomForm>
      ) : (
        <></>
      )}
    </>
  );
}

export default RoomEditor;
