import { useHistory, useParams } from "react-router-dom";
import { Character } from "../Character";
import { initialCharacterFormState } from './CharacterEditor';

function DetailedCharacterList({
  characters,
  addToInitiative,
  editCharacter,
  deleteCharacter,
  resetVision,
}: {
  characters: Character[];
  addToInitiative: any;
  editCharacter: any;
  deleteCharacter: any;
  resetVision: any;
}) {
  const { push } = useHistory();
  const { gameId } = useParams<{
    gameId: string;
  }>();
  return (
    <div>
      <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg m-6">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Character
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NPC
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                HP
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Speed
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                P
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {characters.map((character) => (
              <tr key={character.id}>
                <td
                  className={`px-2 py-4 whitespace-nowrap ${character.color} text-center`}
                >
                  {character.icon}
                </td>

                <td className="px-2 py-4 whitespace-nowrap">
                  {character.name}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {character.npc ? "NPC" : ""}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {character.hp.current} / {character.hp.max}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {character.speed.current} / {character.speed.max}
                </td>

                <td className="px-2 py-4 whitespace-nowrap">
                  {character.perception}
                </td>

                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-start space-x-1">
                    <button
                      className="border-2 border-indigo-200 rounded-md p-1"
                      onClick={() => addToInitiative(character.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-indigo-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                    <button
                      className="border-2 border-indigo-200 rounded-md p-1"
                      onClick={() => editCharacter(character)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-indigo-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      className="border-2 border-indigo-200 rounded-md p-1"
                      onClick={() => {
                        push(`/games/${gameId}/characters/${character.id}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-indigo-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </button>
                    <button
                      className="border-2 border-red-200 rounded-md p-1"
                      onClick={() => resetVision(character.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </button>
                    <button
                      className="border-2 border-red-200 rounded-md p-1"
                      onClick={() => deleteCharacter(character.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td className={`px-2 py-4 whitespace-nowrap`}></td>

              <td className="px-2 py-4 whitespace-nowrap"></td>
              <td className="px-2 py-4 whitespace-nowrap"></td>
              <td className="px-2 py-4 whitespace-nowrap"></td>
              <td className="px-2 py-4 whitespace-nowrap"></td>
              <td className="px-2 py-4 whitespace-nowrap"></td>

              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex justify-start space-x-1">
                  <button
                    className="border-2 border-indigo-200 rounded-md p-1"
                    onClick={() => {
                      editCharacter({ ...initialCharacterFormState });
                    }}
                  >
                    New Character
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailedCharacterList;
