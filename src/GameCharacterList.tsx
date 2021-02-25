import { useHistory } from "react-router-dom";
import { GameProps } from "./DM/GameEditor";

function GameCharacterList({
  game,
}: {
  game: GameProps;

}) {
  const { push } = useHistory();

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
                HP
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(game.characters || []).map((character) => (
              <tr key={character.id}>
                <td
                  className={`px-2 py-4 whitespace-nowrap ${character.color}`}
                ></td>

                <td className="px-2 py-4 whitespace-nowrap">
                  {character.name}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {character.hp.current} / {character.hp.max}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {game.active === character.id ? "ACTIVE" : ""}
                </td>

                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-start space-x-1">
                    <button
                      className="border-2 border-indigo-200 rounded-md p-1"
                      onClick={() => {
                        push(`/games/${game.id}/characters/${character.id}`);
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

export default GameCharacterList;
