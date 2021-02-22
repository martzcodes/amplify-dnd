import { useState } from "react";
import { RoomProps, SpecialGround } from "../Room";

const emptySpecialGround: SpecialGround = {
  origin: {
    x: 1,
    y: 1,
  },
  height: 1,
  width: 1,
  type: "VOID",
};

function RoomForm({ room, upsertRoom, deleteRoom }: { room: RoomProps; upsertRoom: any; deleteRoom: any; }) {
  const [roomFormData, setRoomFormData] = useState(room);

  const addSpecialGround = () => {
    setRoomFormData({
      ...roomFormData,
      specialGrounds: [...roomFormData.specialGrounds, emptySpecialGround],
    });
  };

  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-4">
            <label
              htmlFor="room_name"
              className="block text-sm font-medium text-gray-700"
            >
              Room Name
            </label>
            <input
              type="text"
              name="room_name"
              id="room_name"
              onChange={(e) =>
                setRoomFormData({ ...roomFormData, name: e.target.value })
              }
              value={roomFormData.name}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="y"
              className="block text-sm font-medium text-gray-700"
            >
              Origin: X
            </label>
            <input
              type="text"
              name="y"
              id="y"
              onChange={(e) =>
                setRoomFormData({
                  ...roomFormData,
                  origin: {
                    x: Number(e.target.value),
                    y: roomFormData.origin.y,
                  },
                })
              }
              value={roomFormData.origin.y}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="y"
              className="block text-sm font-medium text-gray-700"
            >
              Origin: Y
            </label>
            <input
              type="text"
              name="y"
              id="y"
              onChange={(e) =>
                setRoomFormData({
                  ...roomFormData,
                  origin: {
                    x: roomFormData.origin.x,
                    y: Number(e.target.value),
                  },
                })
              }
              value={roomFormData.origin.y}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-700"
            >
              Width
            </label>
            <input
              type="text"
              name="width"
              id="width"
              onChange={(e) =>
                setRoomFormData({
                  ...roomFormData,
                  width: Number(e.target.value),
                })
              }
              value={roomFormData.width}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              Height
            </label>
            <input
              type="text"
              name="height"
              id="height"
              onChange={(e) =>
                setRoomFormData({
                  ...roomFormData,
                  height: Number(e.target.value),
                })
              }
              value={roomFormData.height}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6 hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          {roomFormData.specialGrounds.map((specialGround, ind) => (
            <div key={ind} className="col-span-6">
              <div className="grid grid-cols-6">
                <div className="col-span-2">
                  <select
                    id="groundType"
                    name="groundType"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      const updatedGround = {
                        ...roomFormData.specialGrounds[ind],
                      };
                      (updatedGround as any).type = e.target.value;
                      const updatedRoomData = { ...roomFormData };
                      updatedRoomData.specialGrounds[ind] = updatedGround;
                      setRoomFormData({
                        ...updatedRoomData,
                      });
                    }}
                    value={roomFormData.specialGrounds[ind].type}
                  >
                    <option value="LAVA">LAVA</option>
                    <option value="AQUA">WATER</option>
                    <option value="VOID">VOID</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="width"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Width
                  </label>
                  <input
                    type="text"
                    name="width"
                    id="width"
                    onChange={(e) => {
                      const updatedGround = {
                        ...roomFormData.specialGrounds[ind],
                      };
                      updatedGround.width = Number(e.target.value);
                      const updatedRoomData = { ...roomFormData };
                      updatedRoomData.specialGrounds[ind] = updatedGround;
                      setRoomFormData({
                        ...updatedRoomData,
                      });
                    }}
                    value={roomFormData.specialGrounds[ind].width}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Height
                  </label>
                  <input
                    type="text"
                    name="height"
                    id="height"
                    onChange={(e) => {
                      const updatedGround = {
                        ...roomFormData.specialGrounds[ind],
                      };
                      updatedGround.height = Number(e.target.value);
                      const updatedRoomData = { ...roomFormData };
                      updatedRoomData.specialGrounds[ind] = updatedGround;
                      setRoomFormData({
                        ...updatedRoomData,
                      });
                    }}
                    value={roomFormData.specialGrounds[ind].height}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="y"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Origin: X
                  </label>
                  <input
                    type="text"
                    name="y"
                    id="y"
                    onChange={(e) => {
                      const updatedGround = {
                        ...roomFormData.specialGrounds[ind],
                      };
                      updatedGround.origin.x = Number(e.target.value);
                      const updatedRoomData = { ...roomFormData };
                      updatedRoomData.specialGrounds[ind] = updatedGround;
                      setRoomFormData({
                        ...updatedRoomData,
                      });
                    }}
                    value={roomFormData.specialGrounds[ind].origin.x}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="y"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Origin: Y
                  </label>
                  <input
                    type="text"
                    name="y"
                    id="y"
                    onChange={(e) => {
                      const updatedGround = {
                        ...roomFormData.specialGrounds[ind],
                      };
                      updatedGround.origin.y = Number(e.target.value);
                      const updatedRoomData = { ...roomFormData };
                      updatedRoomData.specialGrounds[ind] = updatedGround;
                      setRoomFormData({
                        ...updatedRoomData,
                      });
                    }}
                    value={roomFormData.specialGrounds[ind].origin.y}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addSpecialGround} className="col-span-6">
            Add Special Ground
          </button>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        {room.id ? <button onClick={() => deleteRoom(room.id)}>Delete Room</button> : <></>}
        <button
          onClick={() => {
            upsertRoom(roomFormData);
          }}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {room.id ? "Save" : "Create"}
        </button>
      </div>
    </div>
  );
}

export default RoomForm;
