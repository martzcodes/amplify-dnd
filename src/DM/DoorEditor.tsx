import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { Door, DoorProps } from "../Door";
import {
  createGameDoor as createGameDoorMutation,
  updateGameDoor as updateGameDoorMutation,
  deleteGameDoor as deleteGameDoorMutation,
} from "../graphql/mutations";
import DoorForm from "./DoorForm";

const initialDoorFormState: DoorProps = {
  origin: {
    x: 0,
    y: 0,
  },
  open: true,
  locked: false,
  northSouth: false,
};

function DoorEditor({
  doors: serverDoors,
  create,
}: {
  doors: Door[];
  create: boolean;
}) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [doors, setDoors] = useState<Door[]>([]);

  useEffect(() => {
    setDoors(serverDoors);
  }, [serverDoors]);

  async function upsertDoor(door: DoorProps) {
    if (door.id) {
      updateDoor(
        Object.keys(initialDoorFormState).reduce((p, c) => {
          return { ...p, [c]: (door as any)[c] };
        }, {} as DoorProps)
      );
    } else {
      createDoor(door);
    }
  }

  async function createDoor(door: DoorProps) {
    const res = await API.graphql({
      query: createGameDoorMutation,
      variables: { input: { ...door, gameID: gameId } },
    });
    console.log(res);
    setDoors([...doors, new Door(door)]);
  }

  async function updateDoor(updatedDoor: DoorProps) {
    const res = await API.graphql({
      query: updateGameDoorMutation,
      variables: { input: { ...updatedDoor, gameID: gameId } },
    });
    console.log(res);
    const newDoorsArray = doors.filter(
      (door: any) => door.id !== updatedDoor.id
    );
    setDoors(newDoorsArray);
    setDoors([...newDoorsArray, new Door(updatedDoor)]);
  }

  async function deleteDoor({ id }: { id: string }) {
    const newDoorsArray = doors.filter((room: any) => room.id !== id);
    setDoors(newDoorsArray);
    await API.graphql({
      query: deleteGameDoorMutation,
      variables: { input: { id } },
    });
  }

  return (
    <>
      <h1>Doors</h1>
      {doors.map((door) => (
        <DoorForm
          key={`door-${door.id}`}
          door={door}
          upsertDoor={(doorToUpsert: DoorProps) => {
            upsertDoor(doorToUpsert);
          }}
          deleteDoor={(id: string) => {
            deleteDoor({ id });
          }}
        ></DoorForm>
      ))}
      {create ? (
        <DoorForm
          door={initialDoorFormState}
          upsertDoor={(door: DoorProps) => {
            upsertDoor(door);
          }}
          deleteDoor={() => {}}
        ></DoorForm>
      ) : (
        <></>
      )}
    </>
  );
}

export default DoorEditor;
