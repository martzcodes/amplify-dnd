import { useEffect, useState } from "react";
import { DoorProps } from "../Door";

function DoorForm({
  door,
  upsertDoor,
  cancel
}: {
  door: DoorProps | null;
  upsertDoor: any;
  cancel: () => void;
}) {
  const [doorFormData, setDoorFormData] = useState<DoorProps | null>(null);

  useEffect(() => {
    setDoorFormData(door);
  }, [door]);

  return doorFormData ? (
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-3">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={doorFormData.open}
                onChange={(e) => {
                  setDoorFormData({
                    ...doorFormData,
                    open: !doorFormData.open,
                    locked: !doorFormData.open ? false : doorFormData.locked,
                  });
                }}
              />
              <span className="ml-2 text-gray-700">Open</span>
            </label>
          </div>
          <div className="col-span-3">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={doorFormData.locked}
                onChange={(e) =>
                  setDoorFormData({
                    ...doorFormData,
                    locked: !doorFormData.locked,
                    open: !doorFormData.locked ? false : doorFormData.open,
                  })
                }
              />
              <span className="ml-2 text-gray-700">Locked</span>
            </label>
          </div>
          <div className="col-span-3">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={doorFormData.hidden}
                onChange={(e) =>
                  setDoorFormData({
                    ...doorFormData,
                    hidden: !doorFormData.hidden,
                  })
                }
              />
              <span className="ml-2 text-gray-700">Hidden</span>
            </label>
          </div>
          <div className="col-span-3">
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
            {door && door.id ? "Save" : "Create"}
          </button>
        </div>
        <div className="flex-1">
          <button
            onClick={() => {
              cancel();
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default DoorForm;
