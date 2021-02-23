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

const initialCharacterFormState: CharacterProps = {
  name: "",
  email: "",
  color: "bg-blue-500",
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
};

function CharacterEditor({
  characters: serverCharacters,
  create,
}: {
  characters: Character[];
  create: boolean;
}) {
  const { gameId } = useParams<{
    gameId: string;
  }>();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setCharacters(serverCharacters);
  }, [serverCharacters]);

  async function upsertCharacter(character: CharacterProps) {
    if (character.id) {
      updateCharacter(
        Object.keys(initialCharacterFormState).reduce((p, c) => {
          return { ...p, [c]: (character as any)[c] };
        }, {} as CharacterProps)
      );
    } else {
      createCharacter(character);
    }
  }

  async function createCharacter(character: CharacterProps) {
    const res = await API.graphql({
      query: createGameCharacterMutation,
      variables: { input: { ...character, gameID: gameId } },
    });
    console.log(res);
    setCharacters([...characters, new Character(character)]);
  }

  async function updateCharacter(updatedCharacter: CharacterProps) {
    const res = await API.graphql({
      query: updateGameCharacterMutation,
      variables: { input: { ...updatedCharacter, gameID: gameId } },
    });
    console.log(res);
    const newCharactersArray = characters.filter(
      (character: any) => character.id !== updatedCharacter.id
    );
    setCharacters(newCharactersArray);
    setCharacters([...newCharactersArray, new Character(updatedCharacter)]);
  }

  async function deleteCharacter({ id }: { id: string }) {
    const newCharactersArray = characters.filter((room: any) => room.id !== id);
    setCharacters(newCharactersArray);
    await API.graphql({
      query: deleteGameCharacterMutation,
      variables: { input: { id } },
    });
  }

  return (
    <>
      <h1>Characters</h1>
      {characters.map((character) => (
        <CharacterForm
          key={`character-${character.id}`}
          character={character}
          upsertCharacter={(characterToUpsert: CharacterProps) => {
            upsertCharacter(characterToUpsert);
          }}
          deleteCharacter={(id: string) => {
            deleteCharacter({ id });
          }}
        ></CharacterForm>
      ))}
      {create ? (
        <CharacterForm
          character={initialCharacterFormState}
          upsertCharacter={(character: CharacterProps) => {
            upsertCharacter(character);
          }}
          deleteCharacter={() => {}}
        ></CharacterForm>
      ) : (
        <></>
      )}
    </>
  );
}

export default CharacterEditor;
