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
import { bumpAction } from "../Game";

export const initialRoomFormState: RoomProps = {
  name: "",
  origin: { x: 0, y: 0 },
  height: 0,
  width: 0,
  defaultGroundType: "GRND",
  specialGrounds: [],
};

function RoomEditor({ rooms: initialRooms }: { rooms: Room[] }) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [roomForm, setRoomForm] = useState<RoomProps | null>(null);

  useEffect(() => {
    setRooms(initialRooms);
  }, [initialRooms]);

  const upsertRoom = async (room: RoomProps) => {
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
  };

  const createRoom = async (room: RoomProps) => {
    await API.graphql({
      query: createGameRoomMutation,
      variables: { input: { ...room, gameID: gameId } },
    });
    bumpAction(gameId);
  };

  const updateRoom = async (updatedRoom: RoomProps) => {
    await API.graphql({
      query: updateGameRoomMutation,
      variables: { input: { ...updatedRoom, gameID: gameId } },
    });
    rooms.filter((room: any) => room.id !== updatedRoom.id);
    bumpAction(gameId);
  };

  const deleteRoom = async ({ id }: { id: string }) => {
    await API.graphql({
      query: deleteGameRoomMutation,
      variables: { input: { id } },
    });
    bumpAction(gameId);
  };

  const cancel = () => {
    setRoomForm(null);
  };

  return (
    <>
      <RoomList
        rooms={rooms}
        editRoom={(room: Room) => {
          setRoomForm({ ...room });
        }}
        deleteRoom={(id: string) => deleteRoom({ id })}
      ></RoomList>
      <RoomForm
        room={roomForm}
        upsertRoom={(room: RoomProps) => {
          upsertRoom(room);
        }}
        cancel={cancel}
      ></RoomForm>
    </>
  );
}

export default RoomEditor;
