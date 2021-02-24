import { useEffect, useState } from "react";
import { DoorProps } from "../Door";

function DoorForm({
  door,
  upsertDoor,
}: {
  door: DoorProps;
  upsertDoor: any;
}) {
  const [doorFormData, setDoorFormData] = useState(door);

  useEffect(() => {
    setDoorFormData(door);
  }, [door])

  return (
    <div className="py-1">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label
              htmlFor="y"
              className="block text-sm font-medium text-gray-700"
            >
              Origin: X
            </label>
            <input
              type="text"
              name="y"
              onChange={(e) =>
                setDoorFormData({
                  ...doorFormData,
                  origin: {
                    x: Number(e.target.value),
                    y: doorFormData.origin.y,
                  },
                })
              }
              value={doorFormData.origin.x}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="y"
              className="block text-sm font-medium text-gray-700"
            >
              Origin: Y
            </label>
            <input
              type="text"
              name="y"
              onChange={(e) =>
                setDoorFormData({
                  ...doorFormData,
                  origin: {
                    x: doorFormData.origin.x,
                    y: Number(e.target.value),
                  },
                })
              }
              value={doorFormData.origin.y}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={doorFormData.open}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDoorFormData({
                    ...doorFormData,
                    open: !doorFormData.open,
                  });
                }}
              />
              <span className="ml-2 text-gray-700">Open</span>
            </label>
          </div>
          <div className="col-span-6">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={doorFormData.locked}
                onChange={(e) =>
                  setDoorFormData({
                    ...doorFormData,
                    locked: !doorFormData.locked,
                  })
                }
              />
              <span className="ml-2 text-gray-700">Locked</span>
            </label>
          </div>
          <div className="col-span-6">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={doorFormData.northSouth}
                onChange={(e) =>
                  setDoorFormData({
                    ...doorFormData,
                    northSouth: !doorFormData.northSouth,
                  })
                }
              />
              <span className="ml-2 text-gray-700">North-South</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex bg-gray-50">
        <div className="flex-1">
          <button
            onClick={() => {
              upsertDoor(doorFormData);
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {door.id ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoorForm;
