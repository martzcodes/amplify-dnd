import { useEffect, useState } from "react";
import { SpecialGround } from "../Room";

const emptySpecialGround: SpecialGround = {
  origin: {
    x: 1,
    y: 1,
  },
  height: 1,
  width: 1,
  type: "VOID",
};

function SpecialGroundList({
  roomTypeGroundTypes,
  updateRoomGroundTypes,
}: {
  roomTypeGroundTypes: SpecialGround[];
  updateRoomGroundTypes: any;
}) {
  const [groundTypes, updateGroundTypes] = useState(roomTypeGroundTypes);

  useEffect(() => {
    updateGroundTypes(roomTypeGroundTypes);
  }, [roomTypeGroundTypes]);

  const addGroundType = () => {
    updateGroundTypes([...groundTypes, { ...emptySpecialGround }]);
  };

  return (
    <div>
      <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg m-6">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Origin
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dimensions
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groundTypes.map((groundType, ind) => (
              <tr key={`special-ground-${ind}`}>
                <td className={`px-2 py-4 whitespace-nowrap`}></td>

                <td className="px-2 py-4 whitespace-nowrap">
                  <select
                    name="groundType"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      const updatedGrounds = [...groundTypes];
                      (updatedGrounds[ind] as any).type = e.target.value;
                      updateRoomGroundTypes(updatedGrounds);
                    }}
                    value={groundTypes[ind].type}
                  >
                    <option value="LAVA">LAVA</option>
                    <option value="AQUA">WATER</option>
                    <option value="VOID">VOID</option>
                  </select>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  (
                  <input
                    type="text"
                    name="x"
                    onChange={(e) => {
                      const updatedGrounds = [...groundTypes];
                      (updatedGrounds[ind] as any).origin.x = Number(
                        e.target.value
                      );
                      updateRoomGroundTypes(updatedGrounds);
                    }}
                    value={groundTypes[ind].origin.x}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-16"
                  />
                  ,{" "}
                  <input
                    type="text"
                    name="y"
                    onChange={(e) => {
                      const updatedGrounds = [...groundTypes];
                      (updatedGrounds[ind] as any).origin.y = Number(
                        e.target.value
                      );
                      updateRoomGroundTypes(updatedGrounds);
                    }}
                    value={groundTypes[ind].origin.y}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-16"
                  />
                  )
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="width"
                    onChange={(e) => {
                      const updatedGrounds = [...groundTypes];
                      (updatedGrounds[ind] as any).width = Number(
                        e.target.value
                      );
                      updateRoomGroundTypes(updatedGrounds);
                    }}
                    value={groundTypes[ind].width}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-16"
                  />
                  x{" "}
                  <input
                    type="text"
                    name="height"
                    onChange={(e) => {
                      const updatedGrounds = [...groundTypes];
                      (updatedGrounds[ind] as any).height = Number(
                        e.target.value
                      );
                      updateRoomGroundTypes(updatedGrounds);
                    }}
                    value={groundTypes[ind].height}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-16"
                  />
                </td>

                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-start space-x-1">
                    <button
                      className="border-2 border-red-200 rounded-md p-1"
                      onClick={() => {
                        const updatedGroundTypes = groundTypes.filter(
                          (gT) =>
                            !(
                              gT.type === groundType.type &&
                              gT.origin.x === groundType.origin.x &&
                              gT.origin.y === groundType.origin.y &&
                              gT.height === groundType.height &&
                              gT.width === groundType.width
                            )
                        );
                        updateRoomGroundTypes(updatedGroundTypes);
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
            <tr>
              <td className={`px-2 py-4 whitespace-nowrap`}></td>

              <td className="px-2 py-4 whitespace-nowrap"></td>
              <td className="px-2 py-4 whitespace-nowrap"></td>
              <td className="px-2 py-4 whitespace-nowrap"></td>

              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex justify-start space-x-1">
                  <button
                    className="border-2 border-indigo-200 rounded-md p-1"
                    onClick={() => addGroundType()}
                  >
                    Add Special Ground
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

export default SpecialGroundList;
