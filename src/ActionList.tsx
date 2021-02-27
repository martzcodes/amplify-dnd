import { useEffect, useState } from "react";
import { Character } from "./Character";
import { Location } from "./models/Location";

const actions = [
  { name: "End Turn", type: "end", color: "bg-red-800" },
  { name: "Move", type: "move", color: "bg-green-800" },
  { name: "Dash", type: "dash", color: "bg-blue-800" },
  { name: "Open Door", type: "open", color: "bg-blue-800" },
  { name: "Close Door", type: "close", color: "bg-blue-800" },
];

const getMovement = (character: Character) => {
  if (character.selectedTile) {
    const moveInd = character.selectedTile.actions.findIndex(
      (action) => action.type === "move"
    );
    if (moveInd !== -1) {
      return [
        character.speed.current >= 0 ? true : false,
        character.selectedTile.actions[moveInd].name,
      ];
    }
    return [false, "Move"];
  }
  return [false, "Move"];
};

const canAction = (character: Character, action: string) => {
  switch (action) {
    case "dash":
      return !character.actionUsed;
    case "move":
      return character.speed.current > 0 && getMovement(character)[0];
    default:
      return true;
  }
};

function ActionList({
  character: gameCharacter,
  setCharacterAction,
}: {
  character: Character;
  setCharacterAction: (action: { character: string; action: string; location?: Location}) => void
}) {
  const [character, setCharacters] = useState(gameCharacter);

  useEffect(() => {
    setCharacters(gameCharacter);
  }, [gameCharacter]);

  return (
    <div className={"py-5"}>
      <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action / Movement
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remaining
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {actions
              .filter((action) => {
                switch (action.type) {
                  case "open":
                    return (
                      character.selectedTile &&
                      character.selectedTile.actions.findIndex(
                        (tileAction) => tileAction.type === "open"
                      ) !== -1
                    );
                  case "close":
                    return (
                      character.selectedTile &&
                      character.selectedTile.actions.findIndex(
                        (tileAction) => tileAction.type === "close"
                      ) !== -1
                    );
                  default:
                    return true;
                }
              })
              .map((action, ind) => (
                <tr key={action.type}>
                  <td
                    className={`px-2 py-4 whitespace-nowrap ${action.color}`}
                  ></td>

                  <td className="px-2 py-4 whitespace-normal break-words">
                    {action.type === "move"
                      ? getMovement(character)[1]
                      : action.name}
                  </td>
                  <td className="px-2 py-4 whitespace-normal break-words">
                    {action.type === "move" ? character.speed.current : ""}
                  </td>

                  <td className="px-2 py-4 whitespace-nowrap">
                    {canAction(character, action.type) ? (
                      <button
                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${action.color} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                        onClick={() => {
                          setCharacterAction({
                            character: character.id,
                            action: action.type,
                            location: character.selectedTile?.location,
                          });
                        }}
                      >
                        {action.name}
                      </button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActionList;
