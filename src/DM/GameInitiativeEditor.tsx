import { useEffect, useState } from "react";
import { Character } from "../Character";

function GameInitiativeEditor({
  characters: gameCharacters,
  updateInitiative,
  active,
}: {
  characters: Character[];
  updateInitiative: any;
  active?: string;
}) {
  const [characters, setCharacters] = useState(gameCharacters);

  useEffect(() => {
    setCharacters(gameCharacters);
  }, [gameCharacters]);
  return (
    <div>
      <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg m-6">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Character
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {characters.map((character, ind) => (
              <tr
                key={character.id}
                className={
                  active === character.id ? `${character.color} text-white` : ""
                }
              >
                <td
                  className={`px-2 py-4 whitespace-nowrap ${character.color} text-center`}
                >
                  {character.icon}
                </td>

                <td className="px-2 py-4 whitespace-nowrap">{ind + 1}</td>

                <td className="px-2 py-4 whitespace-nowrap">
                  {character.name}
                </td>

                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-start space-x-1">
                    <button
                      className="border-2 border-indigo-200 rounded-md p-1 bg-white"
                      onClick={() => {
                        if (ind > 0) {
                          let updatedList = [...characters];
                          const characterToMove = updatedList.splice(ind, 1)[0];
                          updatedList.splice(ind - 1, 0, characterToMove);
                          updateInitiative(updatedList);
                        }
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
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    </button>
                    <button
                      className="border-2 border-indigo-200 rounded-md p-1 bg-white"
                      onClick={() => {
                        if (ind < characters.length - 1) {
                          let updatedList = [...characters];
                          const characterToMove = updatedList.splice(ind, 1)[0];
                          updatedList.splice(ind + 1, 0, characterToMove);
                          updateInitiative(updatedList);
                        }
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
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </button>
                    <button
                      className="border-2 border-red-200 rounded-md p-1 bg-white"
                      onClick={() => {
                        let updatedList = [...characters];
                        updatedList.splice(ind, 1);
                        updateInitiative(updatedList);
                      }}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GameInitiativeEditor;
