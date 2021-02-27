import { useEffect, useState } from "react";
import { AreaProps } from "../Area";

function AreaForm({
  area,
  upsertArea,
  cancel,
}: {
  area: AreaProps | null;
  upsertArea: any;
  cancel: () => void;
}) {
  const [areaFormData, setAreaFormData] = useState<AreaProps | null>(null);

  useEffect(() => {
    setAreaFormData(area);
  }, [area]);

  return areaFormData ? (
    <div className="py-1">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) =>
                setAreaFormData({
                  ...areaFormData,
                  name: e.target.value,
                })
              }
              value={areaFormData.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              onChange={(e) =>
                setAreaFormData({
                  ...areaFormData,
                  description: e.target.value,
                })
              }
              value={areaFormData.description}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="x"
              className="block text-sm font-medium text-gray-700"
            >
              Origin: X
            </label>
            <input
              type="text"
              name="y"
              onChange={(e) =>
                setAreaFormData({
                  ...areaFormData,
                  origin: {
                    x: Number(e.target.value),
                    y: areaFormData.origin.y,
                  },
                })
              }
              value={areaFormData.origin.x}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-3">
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
                setAreaFormData({
                  ...areaFormData,
                  origin: {
                    x: areaFormData.origin.x,
                    y: Number(e.target.value),
                  },
                })
              }
              value={areaFormData.origin.y}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-700"
            >
              Width
            </label>
            <input
              type="text"
              name="width"
              onChange={(e) =>
                setAreaFormData({
                  ...areaFormData,
                  width: Number(e.target.value),
                })
              }
              value={areaFormData.width}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              Height
            </label>
            <input
              type="text"
              name="height"
              onChange={(e) =>
                setAreaFormData({
                  ...areaFormData,
                  height: Number(e.target.value),
                })
              }
              value={areaFormData.height}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-3">
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
                setAreaFormData({
                  ...areaFormData,
                  perception: Number(e.target.value),
                })
              }
              value={areaFormData.perception}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-3">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={areaFormData.enabled}
                onChange={(e) => {
                  setAreaFormData({
                    ...areaFormData,
                    enabled: !areaFormData.enabled,
                  });
                }}
              />
              <span className="ml-2 text-gray-700">Enabled</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex bg-gray-50">
        <div className="flex-1">
          <button
            onClick={() => {
              upsertArea(areaFormData);
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {area && area.id ? "Save" : "Create"}
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

export default AreaForm;
