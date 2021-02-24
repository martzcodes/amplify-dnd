import { useEffect, useState } from "react";
import { RoomProps, SpecialGround } from "../Room";
import SpecialGroundList from "./SpecialGroundList";

function RoomForm({
  room,
  upsertRoom,
}: {
  room: RoomProps;
  upsertRoom: any;
}) {
  const [roomFormData, setRoomFormData] = useState(room);

  useEffect(() => {
    setRoomFormData(room);
  }, [room]);

  return (
    <div className="py-1">
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
              onChange={(e) =>
                setRoomFormData({ ...roomFormData, name: e.target.value })
              }
              value={roomFormData.name}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
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
                setRoomFormData({
                  ...roomFormData,
                  origin: {
                    x: Number(e.target.value),
                    y: roomFormData.origin.y,
                  },
                })
              }
              value={roomFormData.origin.x}
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
          <div className="col-span-6">
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
                setRoomFormData({
                  ...roomFormData,
                  width: Number(e.target.value),
                })
              }
              value={roomFormData.width}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6">
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
                setRoomFormData({
                  ...roomFormData,
                  height: Number(e.target.value),
                })
              }
              value={roomFormData.height}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6">
            <SpecialGroundList
              roomTypeGroundTypes={roomFormData.specialGrounds}
              updateRoomGroundTypes={(specialGrounds: SpecialGround[]) => {
                setRoomFormData({
                  ...roomFormData,
                  specialGrounds,
                });
              }}
            ></SpecialGroundList>
          </div>
        </div>
      </div>
      <div className="flex bg-gray-50">
        <div className="flex-1">
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
    </div>
  );
}

export default RoomForm;
