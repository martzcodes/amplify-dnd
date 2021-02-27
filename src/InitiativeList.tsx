import { useEffect, useState } from "react";
import { Character } from "./Character";

function InitiativeList({
  active,
  initiative: gameInitiative,
  characters: gameCharacters,
}: {
  active: string;
  initiative: string[];
  characters: Character[];
}) {
  const [characters, setCharacters] = useState(gameCharacters);
  const [initiative, setInitiative] = useState(gameInitiative);

  useEffect(() => {
    setCharacters(gameCharacters);
  }, [gameCharacters]);
    useEffect(() => {
      setInitiative(gameInitiative);
    }, [gameInitiative]);
  return (
    <div className={'py-5'}>
      <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Character
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Damage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {initiative.map((init, ind) => {
              const character = characters.find(char => char.id === init);
              return character ? (
                <tr
                  key={character.id}
                  className={
                    active === character.id
                      ? `${character.color} text-white`
                      : ""
                  }
                >
                  <td
                    className={`px-2 py-4 whitespace-nowrap ${character.color} text-center`}
                  >
                    {character.icon}
                  </td>

                  <td className="px-2 py-4 whitespace-normal break-words">
                    {character.name}
                  </td>

                  <td className="px-2 py-4 whitespace-nowrap">
                    {character.getStats().damage}
                  </td>
                </tr>
              ) : (
                <></>
              );})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InitiativeList;
