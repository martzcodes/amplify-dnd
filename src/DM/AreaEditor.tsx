import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  createGameArea as createGameAreaMutation,
  updateGameArea as updateGameAreaMutation,
  deleteGameArea as deleteGameAreaMutation,
} from "../graphql/mutations";
import AreaForm from "./AreaForm";
import { GameProps } from "./GameEditor";
import { bumpGame } from "../Game";
import { AreaProps } from "../Area";
import DetailedAreaList from "./DetailedAreaList";

export const initialAreaFormState: AreaProps = {
  name: '',
  description: '',
  origin: {
    x: 0,
    y: 0
  },
  height: 1,
  width: 1,
  perception: 0,
  enabled: false,
};

function AreaEditor({
  areas: serverAreas,
  addToInitiative,
}: {
  areas: AreaProps[];
  game: GameProps;
  addToInitiative: (id: string) => {};
}) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [areas, setAreas] = useState<AreaProps[]>([]);
  const [areaForm, setAreaForm] = useState<AreaProps | null>(
    null
  );

  useEffect(() => {
    setAreas(serverAreas);
  }, [serverAreas]);

  const upsertArea = async (area: AreaProps) => {
    if (area.id) {
      updateArea(
        Object.keys(initialAreaFormState).reduce(
          (p, c) => {
            return { ...p, [c]: (area as any)[c] };
          },
          { id: area.id } as AreaProps
        )
      );
    } else {
      createArea(area);
    }
    setAreaForm(null);
  };

  const createArea = async (area: AreaProps) => {
    await API.graphql({
      query: createGameAreaMutation,
      variables: { input: { ...area, gameID: gameId } },
    });
    bumpGame(gameId);
  };

  const updateArea = async (updatedArea: AreaProps) => {
    await API.graphql({
      query: updateGameAreaMutation,
      variables: { input: { ...updatedArea, gameID: gameId } },
    });
    bumpGame(gameId);
  };

  const cancel = () => {
    setAreaForm(null);
  };

  const deleteArea = async ({ id }: { id: string }) => {
    const newAreasArray = areas.filter((room: any) => room.id !== id);
    setAreas(newAreasArray);
    await API.graphql({
      query: deleteGameAreaMutation,
      variables: { input: { id } },
    });
    bumpGame(gameId);
  };

  return (
    <>
      <DetailedAreaList
        areas={areas}
        editArea={(area: AreaProps) => {
          setAreaForm({ ...area });
        }}
        deleteArea={(id: string) => {
          deleteArea({ id });
        }}
        updateArea={(area: AreaProps) => {
          upsertArea(area);
        }}
      ></DetailedAreaList>
      <AreaForm
        area={areaForm}
        upsertArea={(area: AreaProps) => {
          upsertArea(area);
        }}
        cancel={cancel}
      ></AreaForm>
    </>
  );
}

export default AreaEditor;
