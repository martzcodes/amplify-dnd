import { useEffect, useState } from "react";
import { AreaProps } from "./Area";
import { Character } from "./Character";

function AreaList({
  character: gameCharacter,
  areas: gameAreas,
}: {
  character: Character;
  areas: AreaProps[];
}) {
  const [character, setCharacter] = useState(gameCharacter);
  const [areas, setAreas] = useState(gameAreas);

  useEffect(() => {
    setCharacter(gameCharacter);
  }, [gameCharacter]);
  useEffect(() => {
    setAreas(gameAreas);
  }, [gameAreas]);
  return (
    <div>
      <div className="shadow border border-gray-200 sm:rounded-lg overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Perception
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {areas.map((area, ind) => (
              <tr key={area.id}>
                <td className={`px-2 py-4 whitespace-normal break-words ${area.perception > 0 && character.perception >= area.perception ? `${character.color} text-white` : ''}`}>
                  {area.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AreaList;
