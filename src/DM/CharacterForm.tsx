import { useEffect, useState } from "react";
import { CharacterProps } from "../Character";

function CharacterForm({
  character,
  upsertCharacter,
}: {
  character: CharacterProps;
  upsertCharacter: any;
}) {
  const [characterFormData, setCharacterFormData] = useState(character);

  useEffect(() => {
    setCharacterFormData(character);
  },[character])

  return (
    <div className="py-1">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label
              htmlFor="character_name"
              className="block text-sm font-medium text-gray-700"
            >
              Character Name
            </label>
            <input
              type="text"
              name="character_name"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  name: e.target.value,
                })
              }
              value={characterFormData.name}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="player_email"
              className="block text-sm font-medium text-gray-700"
            >
              Player Email
            </label>
            <input
              type="text"
              name="player_email"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  email: e.target.value,
                })
              }
              value={characterFormData.email}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="perception"
              className="block text-sm font-medium text-gray-700"
            >
              Perception
            </label>
            <input
              type="text"
              name="perception"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  perception: Number(e.target.value),
                })
              }
              value={characterFormData.perception}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="location_x"
              className="block text-sm font-medium text-gray-700"
            >
              Location: X
            </label>
            <input
              type="text"
              name="location_x"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  location: {
                    x: Number(e.target.value),
                    y: characterFormData.location.y,
                  },
                })
              }
              value={characterFormData.location.x}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="location_y"
              className="block text-sm font-medium text-gray-700"
            >
              Location: Y
            </label>
            <input
              type="text"
              name="location_y"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  location: {
                    y: Number(e.target.value),
                    x: characterFormData.location.x,
                  },
                })
              }
              value={characterFormData.location.y}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="current_hp"
              className="block text-sm font-medium text-gray-700"
            >
              Current HP
            </label>
            <input
              type="text"
              name="current_hp"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  hp: {
                    current: Number(e.target.value),
                    max: characterFormData.hp.max,
                  },
                })
              }
              value={characterFormData.hp.current}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="max_hp"
              className="block text-sm font-medium text-gray-700"
            >
              Max HP
            </label>
            <input
              type="text"
              name="max_hp"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  hp: {
                    max: Number(e.target.value),
                    current: characterFormData.hp.max,
                  },
                })
              }
              value={characterFormData.hp.max}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="current_speed"
              className="block text-sm font-medium text-gray-700"
            >
              Current Speed
            </label>
            <input
              type="text"
              name="current_speed"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  speed: {
                    current: Number(e.target.value),
                    max: characterFormData.speed.max,
                  },
                })
              }
              value={characterFormData.speed.current}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="max_speed"
              className="block text-sm font-medium text-gray-700"
            >
              Max Speed
            </label>
            <input
              type="text"
              name="max_speed"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  speed: {
                    max: Number(e.target.value),
                    current: characterFormData.speed.max,
                  },
                })
              }
              value={characterFormData.speed.max}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="vision"
              className="block text-sm font-medium text-gray-700"
            >
              Vision
            </label>
            <input
              type="text"
              name="current_speed"
              onChange={(e) =>
                setCharacterFormData({
                  ...characterFormData,
                  vision: Number(e.target.value),
                })
              }
              value={characterFormData.vision}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="y"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <select
              name="color"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => {
                setCharacterFormData({
                  ...characterFormData,
                  color: e.target.value,
                });
              }}
              value={characterFormData.color}
            >
              {[
                "bg-blue-500",
                "bg-purple-500",
                "bg-red-500",
                "bg-yellow-500",
                "bg-green-500",
                "bg-pink-500",
              ].map((color) => (
                <option value={color}>{color}</option>
              ))}
            </select>
          </div>
          <div className={`col-span-3 text-white ${characterFormData.color}`}>
            {characterFormData.color}
          </div>
          <div className="col-span-6">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={characterFormData.actionUsed}
                onChange={(e) => {
                  setCharacterFormData({
                    ...characterFormData,
                    actionUsed: !characterFormData.actionUsed,
                  });
                }}
              />
              <span className="ml-2 text-gray-700">Action Used</span>
            </label>
          </div>
        </div>
      </div>
      <div className={`flex bg-gray-50`}>
        <div className="flex-1">
          <button
            onClick={() => {
              upsertCharacter(characterFormData);
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {character.id ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterForm;
