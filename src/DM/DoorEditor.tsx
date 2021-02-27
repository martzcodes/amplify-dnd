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
import DoorList from "./DoorList";
import { bumpAction } from "../Game";

export const initialDoorFormState: DoorProps = {
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
}: {
  doors: Door[];
}) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [doors, setDoors] = useState<Door[]>([]);
  const [doorForm, setDoorForm] = useState<DoorProps | null>(null);

  useEffect(() => {
    setDoors(serverDoors);
  }, [serverDoors]);

  const upsertDoor = async (door: DoorProps) => {
    if (door.id) {
      updateDoor(
        Object.keys(initialDoorFormState).reduce(
          (p, c) => {
            return { ...p, [c]: (door as any)[c] };
          },
          { id: door.id } as DoorProps
        )
      );
    } else {
      createDoor(door);
    }
  };

  const createDoor = async (door: DoorProps) => {
    await API.graphql({
      query: createGameDoorMutation,
      variables: { input: { ...door, gameID: gameId } },
    });
    bumpAction(gameId);
  };

  const updateDoor = async (updatedDoor: DoorProps) => {
    await API.graphql({
      query: updateGameDoorMutation,
      variables: { input: { ...updatedDoor, gameID: gameId } },
    });
    bumpAction(gameId);
  };

  const deleteDoor = async ({ id }: { id: string }) => {
    await API.graphql({
      query: deleteGameDoorMutation,
      variables: { input: { id } },
    });
    bumpAction(gameId);
  };

  const cancel = () => {
    setDoorForm(null);
  }

  return (
    <>
      <DoorList
        doors={doors}
        editDoor={(door: Door) => {
          setDoorForm({ ...door });
        }}
        deleteDoor={(id: string) => deleteDoor({ id })}
      ></DoorList>
      <DoorForm
        door={doorForm}
        upsertDoor={(door: DoorProps) => {
          upsertDoor(door);
        }}
        cancel={cancel}
      ></DoorForm>
    </>
  );
}

export default DoorEditor;
