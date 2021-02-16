import { Bounds } from "./Board";
import { Door } from "./models/Door";
import { Location } from "./models/Location";
import { Tile, TileProps } from "./Tile";
import { hashLocation } from "./utils/hashLocation";


export const getRoom = (
  rooms: Record<string, Room>,
  loc: Location
): Room | undefined => {
  return Object.values(rooms).find((room) => {
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
      const roomOffset = { ...rooms[roomName].offset };
      roomOffset.x += globalOffset.x;
      roomOffset.y += globalOffset.y;
      rooms[roomName].applyOffset(roomOffset);
    });
  }
  return getGlobalBounds(rooms);
};

export const getDoorsFromRooms = (rooms: Record<string, Room>): string[] => {
  const doors: Set<string> = Object.values(rooms).reduce((p, room) => {
    room.doors.forEach((door) => {
      p.add(door.name);
    });
    return p;
  }, new Set([]) as Set<string>);
  return Array.from(doors);
}

export const roomsToBoard = (rooms: Record<string, Room>): string[][] => {
  const doors: Set<string> = new Set(getDoorsFromRooms(rooms));
  doors.forEach((door) => {
    const doorNames = door.slice(2);
    if (doorNames[0] !== doorNames[1]) {
      const roomOne = rooms[doorNames[0]];
      const roomOneDoor = roomOne.doors.find((rD) => rD.name === door);
      const roomTwo = rooms[doorNames[1]];
      const roomTwoDoor = roomTwo.doors.find((rD) => rD.name === door);
      if (
        roomOneDoor &&
        roomTwoDoor &&
        roomTwo.offset.x === 0 &&
        roomTwo.offset.y === 0
      ) {
        const roomOneDoorLocation = {
          ...roomOneDoor.location,
        };
        roomOneDoorLocation.x += roomOne.offset.x;
        roomOneDoorLocation.y += roomOne.offset.y;

        const roomTwoOffset = { ...roomTwo.offset };
        roomTwoOffset.x -= roomTwoDoor.location.x;
        roomTwoOffset.y -= roomTwoDoor.location.y;
        roomTwoOffset.x += roomOneDoorLocation.x;
        roomTwoOffset.y += roomOneDoorLocation.y;
        rooms[doorNames[1]].applyOffset(roomTwoOffset);
      }
    }
  });
  const bounds = calculateGlobalBounds(rooms);
  const board = Array(bounds.y.max + 1)
    .fill([])
    .map((_u) => Array(bounds.x.max + 1).fill("VOID"));
  Object.values(rooms).forEach((room) => {
    room.grid.forEach((row, rowInd) => {
      row.forEach((cell, colInd) => {
        board[rowInd + room.offset.y][colInd + room.offset.x] = cell;
      });
    });
  });
  return board;
};
interface RoomProps {
  name: string;
  cellSize: number;
  width: number;
  height: number;
  walls: Set<string>;
  doors: Door[];
  grid: string[][];
}

export class Room implements RoomProps {
  name: string = "";
  cellSize = 5;
  width = 0;
  height = 0;
  walls = new Set<string>([]);
  doors: Door[] = [];
  grid: string[][] = [];
  offset: Location = {
    x: 0,
    y: 0,
  };

  constructor(roomProps: RoomProps) {
    Object.assign(this, roomProps);
    this.grid.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === "WALL" || cell === "VOID") {
          this.walls.add(hashLocation({ x, y }));
        }
        if (cell.startsWith("D")) {
          this.walls.add(hashLocation({ x, y }));
          this.addDoor(cell, { x, y });
        }
      })
    );
    this.height = this.grid.length;
    this.width = this.grid[0].length;
  }

  applyOffset(loc: Location) {
    this.offset = loc;
  }

  getBounds(): Bounds {
    return {
      x: {
        min: 0 + this.offset.x,
        max: this.width - 1 + this.offset.x,
      },
      y: {
        min: 0 + this.offset.y,
        max: this.height - 1 + this.offset.y,
      },
    };
  }

  addWall(loc: Location) {
    this.walls.add(hashLocation(loc));
  }

  addDoor(doorName: string, loc: Location) {
    if (this.walls.has(hashLocation(loc))) {
      this.doors.push({
        name: doorName,
        location: loc,
        open: doorName.startsWith("DO"),
        locked: doorName.startsWith("DL"),
        room: this.name,
      });
    }
  }

  getDoorByLocation(loc: Location): string {
    const foundDoors = this.doors.filter(
      (door) => hashLocation(door.location) === hashLocation(loc)
    );
    if (foundDoors.length === 1) {
      return foundDoors[0].name;
    }
    return "";
  }

  getTile(loc: Location): Tile {
    const tileProps: TileProps = {
      type: "void",
      location: loc,
      size: this.cellSize,
      name: this.getDoorByLocation(loc),
    };
    const gridLoc = this.grid[loc.y - this.offset.y][loc.x - this.offset.x];
    if (gridLoc === "WALL") {
      tileProps.type = "wall";
    }
    if (gridLoc.startsWith("DC")) {
      tileProps.type = "door-closed";
    }
    if (gridLoc.startsWith("DO")) {
      tileProps.type = "door-open";
    }
    if (gridLoc.startsWith("DL")) {
      tileProps.type = "door-locked";
    }
    if (gridLoc === "    ") {
      tileProps.type = "normal";
    }
    return new Tile(tileProps);
  }
}

export const roomA = new Room({
    name: "A",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","WALL",],
      // prettier-ignore
      ["DOAA","    ","    ","    ","DOAB",],
      // prettier-ignore
      ["WALL","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL",],
    ],
  } as RoomProps);
  export const roomB = new Room({
    name: "B",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","WALL","WALL","WALL","DOBF","WALL","WALL","WALL","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["DOAB","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","DOBD",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","DOBC","WALL","WALL","WALL",],
    ],
  } as RoomProps);
  export const roomC = new Room({
    name: "C",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","DOBC","WALL","WALL","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","DOCE","WALL","WALL","WALL",],
    ],
  } as RoomProps);
  export const roomD = new Room({
    name: "D",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["DOBD","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","DODG",],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL",],
    ],
  } as RoomProps);
  export const roomE = new Room({
    name: "E",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","DOCE","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","DOEG","WALL","WALL","WALL","WALL","WALL","WALL","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL",],
    ],
  } as RoomProps);
  export const roomF = new Room({
    name: "F",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","DOBF","WALL","WALL","WALL","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL"],
    ],
  } as RoomProps);
  export const roomG = new Room({
    name: "G",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL"],
      // prettier-ignore
      ["DODG","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","    ","WALL"],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL","WALL","DOEG","WALL"],
    ],
  } as RoomProps);

