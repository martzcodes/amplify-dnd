import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { Character, CharacterProps } from "../Character";
import {
  createGameCharacter as createGameCharacterMutation,
  updateGameCharacter as updateGameCharacterMutation,
  deleteGameCharacter as deleteGameCharacterMutation,
} from "../graphql/mutations";
import CharacterForm from "./CharacterForm";
import { GameProps } from "./GameEditor";
import DetailedCharacterList from "./DetailedCharacterList";
import { bumpAction } from "../Game";

export const initialCharacterFormState: CharacterProps = {
  name: "",
  color: "bg-blue-500",
  icon: "",
  perception: 0,
  speed: {
    current: 0,
    max: 0,
  },
  hp: {
    current: 0,
    max: 0,
  },
  vision: 0,
  actionUsed: true,
  location: {
    x: 0,
    y: 0,
  },
  revealed: [],
};

function CharacterEditor({
  characters: serverCharacters,
  addToInitiative,
}: {
  characters: Character[];
  game: GameProps;
  addToInitiative: (id: string) => {};
}) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterForm, setCharacterForm] = useState<CharacterProps | null>(
    null
  );

  useEffect(() => {
    setCharacters(serverCharacters);
  }, [serverCharacters]);

  const upsertCharacter = async (character: CharacterProps) => {
    if (character.id) {
      updateCharacter(
        Object.keys(initialCharacterFormState).reduce(
          (p, c) => {
            return { ...p, [c]: (character as any)[c] };
          },
          { id: character.id } as CharacterProps
        )
      );
    } else {
      createCharacter(character);
    }
    setCharacterForm(null);
  };

  const createCharacter = async (character: CharacterProps) => {
    await API.graphql({
      query: createGameCharacterMutation,
      variables: { input: { ...character, gameID: gameId } },
    });
    bumpAction(gameId);
  };

  const updateCharacter = async (updatedCharacter: CharacterProps | null) => {
    await API.graphql({
      query: updateGameCharacterMutation,
      variables: { input: { ...updatedCharacter, gameID: gameId } },
    });
    bumpAction(gameId);
  };

  const cancel = () => {
    setCharacterForm(null);
  };

  const resetVision = async ({ id }: { id: string }) => {
    await API.graphql({
      query: updateGameCharacterMutation,
      variables: { input: { id, gameID: gameId, revealed: [] } },
    });
    bumpAction(gameId);
  };

  const deleteCharacter = async ({ id }: { id: string }) => {
    const newCharactersArray = characters.filter((room: any) => room.id !== id);
    setCharacters(newCharactersArray);
    await API.graphql({
      query: deleteGameCharacterMutation,
      variables: { input: { id } },
    });
    bumpAction(gameId);
  };

  return (
    <>
      <DetailedCharacterList
        characters={characters}
        addToInitiative={(id: string) => {
          addToInitiative(id);
        }}
        editCharacter={(character: Character) => {
          setCharacterForm({ ...character });
        }}
        deleteCharacter={(id: string) => {
          deleteCharacter({ id });
        }}
        resetVision={(id: string) => {
          resetVision({ id });
        }}
      ></DetailedCharacterList>
      <CharacterForm
        character={characterForm}
        upsertCharacter={(character: CharacterProps) => {
          upsertCharacter(character);
        }}
        cancel={cancel}
      ></CharacterForm>
    </>
  );
}

export default CharacterEditor;
