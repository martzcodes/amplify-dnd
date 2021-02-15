import { Door, Bounds, Tile, TileProps } from "./Board";
import { Location } from "./models/Location";
import { hashLocation } from "./utils/hashLocation";

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
      ["WALL","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL",],
    ],
  } as RoomProps);
  export const roomE = new Room({
    name: "E",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","DOCE","WALL","WALL","WALL","WALL","WALL","WALL","WALL",],
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