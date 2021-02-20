import { Bounds } from "./Board";
import { Door } from "./models/Door";
import { Location } from "./models/Location";
import { TileDetails, TileDetailsProps } from "./Tile";
import { hashLocation } from "./utils/hashLocation";

const walkable = new Set(["    ", "WATR", "LAVA"]);

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
        if (roomTwoDoor.location.x === 0) {
          roomTwoOffset.x += 1;
        }
        if (roomTwoDoor.location.y === 0) {
          roomTwoOffset.y += 1;
        }

        rooms[doorNames[1]].applyOffset(roomTwoOffset);
      }
    }
  });
  const bounds = calculateGlobalBounds(rooms);
  const board = Array(bounds.y.max + 1)
    .fill([])
    .map((_u) => Array(bounds.x.max + 1).fill("VOID"));
  Object.values(rooms).forEach((room) => {
    room.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        board[y + room.offset.y][x + room.offset.x] = cell;
      });
    });
  });
  return board;
};
interface RoomProps {
  name: string;
  description: string;
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
  description = '';
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
        if (cell.startsWith('W') || cell === "VOID") {
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

  getTile(loc: Location): TileDetails {
    const tileProps: TileDetailsProps = {
      type: "void",
      location: loc,
      size: this.cellSize,
      name: this.getDoorByLocation(loc),
    };
    const gridLoc = this.grid[loc.y - this.offset.y][loc.x - this.offset.x];
    if (gridLoc.startsWith('W')) {
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
    if (gridLoc === "    " || gridLoc.startsWith('P')) {
      tileProps.type = "normal";
    }
    return new TileDetails(tileProps);
  }
}

export const roomA = new Room({
    name: "A",
    description: `Bacon ipsum dolor amet ham hock biltong kielbasa, pork spare ribs leberkas tri-tip shoulder chuck. Meatball ribeye drumstick shank porchetta spare ribs pork belly brisket tri-tip. Beef alcatra chuck pancetta, tri-tip pork belly picanha corned beef sausage hamburger pastrami beef ribs meatball.`,
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WOUL","WLUL","WLUM","WLUR","WOUR",],
      // prettier-ignore
      ["WLLR","P001","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLM","    ","    ","    ","DOAB",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WODL","WLDL","WLDM","WLDR","WODR",],
    ],
  } as RoomProps);
  export const roomB = new Room({
    name: "B",
    cellSize: 5,
    description: "Large room with some water running through it",
    grid: [
      // prettier-ignore
      ["WOUL","WLUL","WLUL","WLUL","WLUL","WLUL","WLUL","WLUL","WLUL","WLUM","WLUR","WLUR","WLUR","WLUR","WLUR","WLUR","WLUR","WLUR","WLUR","WOUR",],
      // prettier-ignore
      ["WLLR","    ","WATR","    ","    ","WATR","WATR","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLR","    ","WATR","    ","WATR","WATR","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLR","    ","WATR","    ","WATR","WATR","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLR","    ","WATR","WATR","WATR","WATR","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLR","WATR","WATR","WATR","WATR","WIUL","WLDL","WLDL","WLDL","DLBF","WLDR","WLDR","WLDR","WIUR","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLR","    ","    ","    ","WATR","WLRU","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WLLR","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLR","    ","    ","    ","WATR","WLRU","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WLLR","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["DOAB","    ","    ","    ","WATR","WLRU","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WLLR","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLM","    ","WATR","WATR","WATR","WLRM","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WLLM","P002","    ","    ","    ","    ","DLBD",],
      // prettier-ignore
      ["WLLD","    ","WATR","WATR","WATR","WLRD","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WLLD","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WLLD","    ","WATR","WATR","WATR","WLRD","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WLLD","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WLLD","    ","WATR","WATR","WATR","WLRD","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WLLD","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","WLRD","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WLLD","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","WIDL","WLUL","WLUL","WLUL","WLUM","WLUR","WLUR","WLUR","WIDR","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WODL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDM","WLDR","WLDR","WLDR","WLDR","WLDR","WLDR","DCBC","WLDR","WLDR","WODR",],
    ],
  } as RoomProps);
  export const roomC = new Room({
    name: "C",
    description: "Room C Description",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WOUL","WLUL","WLUL","WLUL","DCBC","WLUR","WLUR","WOUR",],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLM","    ","    ","    ","    ","    ","    ","WLRM",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WODL","WLDL","WLDL","WLDL","DCCE","WLDR","WLDR","WODR",],
    ],
  } as RoomProps);
  export const roomD = new Room({
    name: "D",
    description: "Room D Description",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WOUL","WLUL","WLUL","WLUR","WLUR","WOUR",],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["DLBD","    ","    ","    ","    ","WLRM",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","DODG",],
      // prettier-ignore
      ["WODL","WLDL","WLDL","WLDR","WLDR","WODR",],
    ],
  } as RoomProps);
  export const roomE = new Room({
    name: "E",
    description: "Room E Description",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WOUL","DCCE","WLUL","WLUL","WLUL","WLUL","WLUL","WLUL","WLUL","WLUL","WLUL","WLUM","WLUR","WLUR","WLUR","WLUR","DCEG","WLUR","WLUR","WLUR","WLUR","WLUR","WLUR","WOUR",],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRU",],
      // prettier-ignore
      ["WLLM","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRM",],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","WLRD",],
      // prettier-ignore
      ["WODL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDL","WLDM","WLDR","WLDR","WLDR","WLDR","WLDR","WLDR","WLDR","WLDR","WLDR","WLDR","WLDR","WODR",],
    ],
  } as RoomProps);
  export const roomF = new Room({
    name: "F",
    description: "Room F Description",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WOUL","WLUL","WLUL","DLBF","WLUR","WLUR","WOUR"],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","WLRU"],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","WLRU"],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","WLRU"],
      // prettier-ignore
      ["WLLM","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WODL","WLDL","WLDL","WLDM","WLDR","WLDR","WODR"],
    ],
  } as RoomProps);
  export const roomG = new Room({
    name: "G",
    description: "Room G Description",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WOUL","WLUL","WLUL","WLUL","WLUM","WLUR","WLUR","WLUR","WOUR"],
      // prettier-ignore
      ["DODG","    ","    ","    ","    ","    ","    ","    ","WLRU"],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","    ","    ","WLRU"],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","    ","    ","WLRU"],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","    ","    ","WLRU"],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","    ","    ","WLRU"],
      // prettier-ignore
      ["WLLR","    ","    ","    ","    ","    ","    ","    ","WLRU"],
      // prettier-ignore
      ["WLLM","    ","    ","    ","    ","    ","    ","    ","WLRM"],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WLLD","    ","    ","    ","    ","    ","    ","    ","WLRD"],
      // prettier-ignore
      ["WODL","WLDL","WLDL","WLDL","WLDM","DCEG","WLDR","WLDR","WODR"],
    ],
  } as RoomProps);

