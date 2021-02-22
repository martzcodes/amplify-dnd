import { Door } from "./Door";
import { Bounds } from "./InteractionLayer";
import { Location } from "./models/Location";
import { TileDetails, TileDetailsProps } from "./Tile";

export interface SpecialGround {
    origin: Location;
    height: number;
    width: number;
    type: 'LAVA' | 'AQUA' | 'VOID'
}

export const getRoom = (
  rooms: Room[],
  loc: Location
): Room | undefined => {
  return rooms.find((room) => {
    const bounds = room.getBounds();
    if (
      loc.x >= bounds.x.min &&
      loc.x <= bounds.x.max &&
      loc.y >= bounds.y.min &&
      loc.y <= bounds.y.max
    ) {
      const tile = room.getTile(loc);
      if (tile && tile.type !== "void") {
        return true;
      }
    }
    return false;
  });
};

const getGlobalBounds = (rooms: Record<string, Room>): Bounds => {
  return Object.keys(rooms).reduce(
    (p, roomName) => {
      const roomBounds = rooms[roomName].getBounds();
      if (roomBounds.x.min < p.x.min) {
        p.x.min = roomBounds.x.min;
      }
      if (roomBounds.x.max > p.x.max) {
        p.x.max = roomBounds.x.max;
      }
      if (roomBounds.y.min < p.y.min) {
        p.y.min = roomBounds.y.min;
      }
      if (roomBounds.y.max > p.y.max) {
        p.y.max = roomBounds.y.max;
      }
      return p;
    },
    { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } } as Bounds
  );
};

const calculateGlobalBounds = (rooms: Record<string, Room>): Bounds => {
  const bounds = getGlobalBounds(rooms);
  const globalOffset = {
    x: 0,
    y: 0,
  };
  if (bounds.x.min < globalOffset.x) {
    globalOffset.x = -bounds.x.min;
  }
  if (bounds.y.min < globalOffset.y) {
    globalOffset.y = -bounds.y.min;
  }
  if (globalOffset.x !== 0 || globalOffset.y !== 0) {
    Object.keys(rooms).forEach((roomName) => {
      const roomOffset = { ...rooms[roomName].origin };
      roomOffset.x += globalOffset.x;
      roomOffset.y += globalOffset.y;
      rooms[roomName].applyOffset(roomOffset);
    });
  }
  return getGlobalBounds(rooms);
};

// export const roomsToBoard = (rooms: Room[]): string[][] => {
//   const doors: Set<string> = new Set(getDoorsFromRooms(rooms));
//   doors.forEach((door) => {
//     const doorNames = door.slice(2);
//     if (doorNames[0] !== doorNames[1]) {
//       const roomOne = rooms[doorNames[0]];
//       const roomOneDoor = roomOne.doors.find((rD) => rD.name === door);
//       const roomTwo = rooms[doorNames[1]];
//       const roomTwoDoor = roomTwo.doors.find((rD) => rD.name === door);
//       if (
//         roomOneDoor &&
//         roomTwoDoor &&
//         roomTwo.offset.x === 0 &&
//         roomTwo.offset.y === 0
//       ) {
//         const roomOneDoorLocation = {
//           ...roomOneDoor.location,
//         };
//         roomOneDoorLocation.x += roomOne.offset.x;
//         roomOneDoorLocation.y += roomOne.offset.y;

//         const roomTwoOffset = { ...roomTwo.offset };
//         roomTwoOffset.x -= roomTwoDoor.location.x;
//         roomTwoOffset.y -= roomTwoDoor.location.y;
//         roomTwoOffset.x += roomOneDoorLocation.x;
//         roomTwoOffset.y += roomOneDoorLocation.y;
//         if (roomTwoDoor.location.x === 0) {
//           roomTwoOffset.x += 1;
//         }
//         if (roomTwoDoor.location.y === 0) {
//           roomTwoOffset.y += 1;
//         }

//         rooms[doorNames[1]].applyOffset(roomTwoOffset);
//       }
//     }
//   });
//   const bounds = calculateGlobalBounds(rooms);
//   const board = Array(bounds.y.max + 1)
//     .fill([])
//     .map((_u) => Array(bounds.x.max + 1).fill("VOID"));
//   Object.values(rooms).forEach((room) => {
//     room.grid.forEach((row, y) => {
//       row.forEach((cell, x) => {
//         board[y + room.offset.y][x + room.offset.x] = cell;
//       });
//     });
//   });
//   return board;
// };

interface PlayerSpawn {
  playerId: string;
  location: Location;
}
interface Void {
  start: Location;
  end: Location;
}
export interface RoomProps {
  id?: string;
  name: string;
  width: number;
  height: number;
  origin: Location;
  defaultGroundType: string;
  specialGrounds: SpecialGround[];
}

export const getWall = ({ x, y, startX, endX, startY, endY, inner, fillType }: { x: number; y: number; startX: number; endX: number; startY: number; endY: number; inner: boolean; fillType: string; }) => {
  if (x === startX && y === startX) {
    return inner ? 'WIUL' : 'WOUL';
  }
  if (x === startX && y === endY) {
    return inner ? 'WIDL' : 'WODL';
  }
  if (x === endX && y === startY) {
    return inner ? 'WIUR' : 'WOUR';
  }
  if (x === endX && y === endY) {
    return inner ? 'WIDR' : 'WODR';
  }
  if (x === startX) {
    if ((y - startY) === (endY - startY) / 2) {
      return inner ? 'WLRM' : 'WLLM';
    }
    if ((y - startY) < (endY - startY) / 2) {
      return inner ? 'WLRU' : 'WLLR';
    }
    return inner ? 'WLRD' : 'WLLD';
  }
  if (y === startY) {
    if ((x - startX) === (endX - startX) / 2) {
      return inner ? 'WLDM' : 'WLUM';
    }
    if ((x - startX) < (endX - startX) / 2) {
      return inner ? 'WLDL' : 'WLUL';
    }
    return inner ? 'WLDR' : 'WLUR';
  }
  if (x === endX) {
    if ((y - startY) === (endY - startY) / 2) {
      return inner ? 'WLLM' : 'WLRM';
    }
    if ((y - startY) < (endY - startY) / 2) {
      return inner ? 'WLLR' : 'WLRU';
    }
    return inner ? 'WLLD' : 'WLRD';
  }
  if (y === endY) {
    if ((x - startX) === (endX - startX) / 2) {
      return inner ? 'WLUM' : 'WLDM';
    }
    if ((x - startX) < (endX - startX) / 2) {
      return inner ? 'WLUL' : 'WLDL';
    }
    return inner ? 'WLUR' : 'WLDR';
  }
  return fillType;
}

export class Room implements RoomProps {
  id: string = "";
  name: string = "";
  width = 0;
  height = 0;
  defaultGroundType = 'GRND';
  doors: Door[] = [];
  grid: string[][] = [];
  origin: Location = {
    x: 0,
    y: 0,
  };
  specialGrounds: SpecialGround[] = [];

  constructor(roomProps: RoomProps) {
    Object.assign(this, roomProps);
    this.grid = Array(this.height).fill('').map((row, y) => {
      return Array(this.width).fill('').map((tile, x) => {
        return getWall({ x, y, startX: 0, startY: 0, endX: this.width - 1, endY: this.height - 1, inner: false, fillType: this.defaultGroundType });
      });
    });
    this.specialGrounds.forEach((specialGround) => {
      for (let y = specialGround.origin.y; y < specialGround.origin.y + specialGround.height; y++) {
        for (let x = specialGround.origin.x; x < specialGround.origin.x + specialGround.width; x++) {
          if (specialGround.type === 'VOID') {
            this.grid[y][x] = getWall({ x, y, startX: specialGround.origin.x, startY: specialGround.origin.y, endX: specialGround.origin.x, endY: specialGround.origin.y, inner: true, fillType: specialGround.type });
          } else {
            this.grid[y][x] = specialGround.type;
          }
        }
      }
    });
  }

  applyOffset(loc: Location) {
    this.origin = loc;
  }

  getBounds(): Bounds {
    return {
      x: {
        min: 0 + this.origin.x,
        max: this.width - 1 + this.origin.x,
      },
      y: {
        min: 0 + this.origin.y,
        max: this.height - 1 + this.origin.y,
      },
    };
  }

  getTile(loc: Location): TileDetails {
    const tileProps: TileDetailsProps = {
      type: "void",
      location: loc,
      // size: this.cellSize,
      // name: this.getDoorByLocation(loc),
    };
    // const gridLoc = this.grid[loc.y - this.offset.y][loc.x - this.offset.x];
    // if (gridLoc.startsWith('W')) {
    //   tileProps.type = "wall";
    // }
    // if (gridLoc.startsWith("DC")) {
    //   tileProps.type = "door-closed";
    // }
    // if (gridLoc.startsWith("DO")) {
    //   tileProps.type = "door-open";
    // }
    // if (gridLoc.startsWith("DL")) {
    //   tileProps.type = "door-locked";
    // }
    // if (gridLoc === "    " || gridLoc.startsWith('P')) {
    //   tileProps.type = "normal";
    // }
    return new TileDetails(tileProps);
  }
}

export const roomA = new Room({
    name: "A",
    width: 5,
    height: 5,
    origin: {
      x: 0,
      y: 6,
    }
  } as RoomProps);
  export const roomB = new Room({
    name: "B",
    width: 20,
    height: 20,
    origin: {
      x: 5,
      y: 0,
    },
    // water: [
    //   { x: 1, y: 5, },
    //   { x: 2, y: 1, },
    //   { x: 2, y: 2, },
    //   { x: 2, y: 3, },
    //   { x: 2, y: 4, },
    //   { x: 2, y: 5, },
    //   { x: 2, y: 9, },
    //   { x: 2, y: 10, },
    //   { x: 2, y: 11, },
    //   { x: 2, y: 12, },
    //   { x: 3, y: 4, },
    //   { x: 3, y: 5, },
    //   { x: 3, y: 9, },
    //   { x: 3, y: 10, },
    //   { x: 3, y: 11, },
    //   { x: 3, y: 12, },
    //   { x: 4, y: 2, },
    //   { x: 4, y: 3, },
    //   { x: 4, y: 4, },
    //   { x: 4, y: 5, },
    //   { x: 4, y: 6, },
    //   { x: 4, y: 7, },
    //   { x: 4, y: 8, },
    //   { x: 4, y: 9, },
    //   { x: 4, y: 10, },
    //   { x: 4, y: 11, },
    //   { x: 4, y: 12, },
    //   { x: 5, y: 1, },
    //   { x: 5, y: 2, },
    //   { x: 5, y: 3, },
    //   { x: 5, y: 4, },
    //   { x: 6, y: 1, },
    // ],
    // voids: [
    //   { start: { x: 5, y: 5 }, end: {x: 13, y: 14} }
    // ],
  } as RoomProps);
  export const roomC = new Room({
    name: "C",
    width: 8,
    height: 5,
    origin: {
      x: 15,
      y: 20,
    },
    // lava: [
    //   { x: 2, y: 2 },
    //   { x: 3, y: 2 },
    //   { x: 4, y: 2 },
    //   { x: 5, y: 2 },
    // ],
  } as RoomProps);
  export const roomD = new Room({
    name: "D",
    width: 6,
    height: 5,
    origin: {
      x: 25,
      y: 11,
    },
  } as RoomProps);
  export const roomE = new Room({
    name: "E",
    width: 24,
    height: 5,
    origin: {
      x: 7,
      y: 25,
    },
  } as RoomProps);
  export const roomF = new Room({
    name: "F",
    width: 7,
    height: 8,
        origin: {
      x: 11,
      y: 6,
    },
  } as RoomProps);
  export const roomG = new Room({
    name: "G",
    width: 9,
    height: 16,
    origin: {
      x: 31,
      y: 12,
    },
  } as RoomProps);

