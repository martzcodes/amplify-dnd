import { promises } from "dns";
import { useState } from "react";
import "./Board.css";
import { Location } from "./models/Location";

interface Bounds {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

export interface TileProps {
  location: Location;
  type:
    | "door-closed"
    | "door-open"
    | "door-locked"
    | "wall"
    | "normal"
    | "player"
    | "void";
  size: number;
  name?: string;
}

class Tile implements TileProps {
  location: Location = {
    x: -1,
    y: -1,
  };
  type:
    | "door-closed"
    | "door-open"
    | "door-locked"
    | "wall"
    | "normal"
    | "player"
    | "void" = "void";
  name?: string;
  size: number = 5;

  constructor(tileProps: TileProps) {
    Object.assign(this, tileProps);
  }

  clickHandler(player: Player, setPlayer: any, room: Room) {
    const loc = this.location;
    if (player.movement.has(hashLocation(loc))) {
      setPlayer({ ...player, location: { x: loc.x, y: loc.y } });
      console.log(`Click at ${loc.x}, ${loc.y}`);
    }
  }

  getLabel(player: PlayerProps): string {
    switch (this.type) {
      case "door-open":
      case "door-closed":
      case "door-locked":
        return `${this.name}`;
      case "normal":
        return `${
          calculateDistance(
            { x: this.location.x, y: this.location.y },
            { ...player.location }
          ) * this.size
        }`;
      default:
        return "";
    }
  }
}

interface Door {
  name: string;
  location: Location;
  open: boolean;
  locked: boolean;
  room?: string;
}

interface RoomProps {
  name: string;
  cellSize: number;
  width: number;
  height: number;
  walls: Set<string>;
  doors: Door[];
  grid: string[][];
}

class Room implements RoomProps {
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

interface PlayerProps {
  location: Location;
  speed: number;
  vision: number;
}

class Player implements PlayerProps {
  location: Location = {
    x: 0,
    y: 0,
  };
  speed: number = 0;
  vision: number = 0;
  rooms: Record<string, Room> = {};
  movement: Set<string> = new Set([]);
  visible: Set<string> = new Set([]);
  revealed: Set<string> = new Set([]);

  constructor(playerProps: PlayerProps) {
    Object.assign(this, playerProps);
  }

  async addRooms(rooms: Record<string, Room>) {
    this.rooms = rooms;
    this.movement = new Set([hashLocation(this.location)]);
    this.visible = new Set([]);
    this.recrusiveMovement(this.location, 0, {
      [hashLocation(this.location)]: 0,
    });
    console.log(this.movement);
  }

  async recrusiveMovement(
    loc: Location,
    current: number,
    cost: Record<string, number>
  ): Promise<void> {
    const directions = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ];
    const promises = directions.map((move, moveInd) => {
      const nextLoc: Location = {
        x: loc.x + move.x,
        y: loc.y + move.y,
      };
      const hashedLoc = hashLocation(nextLoc);
      if (hashedLoc in cost && current >= cost[hashedLoc]) {
        console.log(`already calculated ${hashedLoc}`);
        return Promise.resolve();
      }
      const nextRoom = getRoom(this.rooms, nextLoc);
      if (!nextRoom) {
        console.log(`no room ${hashedLoc}`);
        return Promise.resolve();
      }
      const tile = nextRoom.getTile(nextLoc);
      console.log(tile);
      const distance = current + tile.size;
      if (tile && !noMove.has(tile.type) && distance <= this.speed) {
        this.movement.add(hashedLoc);
        cost[hashedLoc] = distance;
        return this.recrusiveMovement(nextLoc, distance, cost);
      }
      console.log(`beyond or noMove: ${moveInd}`);
      return Promise.resolve();
    });
    await Promise.all(promises);
  }
}

const hashLocation = (loc: Location): string => `${loc.x}$$$${loc.y}`;
// const unhashLocation = (locString: string): Location => ({ x: Number(locString.split('$$$')[0]), y: Number(locString.split('$$$')[1])});

const initialPlayer: PlayerProps = {
  location: {
    x: 0,
    y: 8,
  },
  speed: 30,
  vision: 50,
};
const calculateDistance = (
  moveFrom: { x: number; y: number },
  moveTo: { x: number; y: number }
) => {
  const diffX = Math.abs(moveFrom.x - moveTo.x);
  const diffY = Math.abs(moveFrom.y - moveTo.y);
  return Math.max(diffX, diffY);
};

const noMove = new Set([
  "wall",
  "void",
  "door-closed",
  "door-locked",
  "player",
]);

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
  console.log(bounds);
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

const roomsToBoard = (rooms: Record<string, Room>): string[][] => {
  const doors: Set<string> = Object.values(rooms).reduce((p, room) => {
    room.doors.forEach((door) => {
      p.add(door.name);
    });
    return p;
  }, new Set([]) as Set<string>);
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
        // console.log(
        //   `Would set ${rowInd + room.offset.y}, ${
        //     colInd + room.offset.x
        //   } to ${cell}`
        // );
        board[rowInd + room.offset.y][colInd + room.offset.x] = cell;
      });
    });
  });
  return board;
};

const getRoom = (
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

function Board() {
  const [playerProps, setPlayer] = useState(initialPlayer);
  const player = new Player(playerProps);
  const roomA = new Room({
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
  const roomB = new Room({
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
      ["WALL","    ","    ","    ","    ","WALL","WALL","WALL","WALL","DCBF","WALL","WALL","WALL","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["DOAB","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL","VOID","VOID","VOID","VOID","VOID","VOID","VOID","WALL","    ","    ","    ","    ","    ","DCBD",],
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
      ["WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","DLBC","WALL","WALL","WALL",],
    ],
  } as RoomProps);
  const roomC = new Room({
    name: "C",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","DLBC","WALL","WALL","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","DLCE","WALL","WALL","WALL",],
    ],
  } as RoomProps);
  const roomD = new Room({
    name: "D",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["DCBD","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","    ","    ","    ","    ","WALL",],
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL",],
    ],
  } as RoomProps);
  const roomE = new Room({
    name: "E",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","WALL","DLCE","WALL","WALL","WALL","WALL","WALL","WALL","WALL",],
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
  const roomF = new Room({
    name: "F",
    cellSize: 5,
    grid: [
      // prettier-ignore
      ["WALL","WALL","WALL","WALL","DCBF","WALL","WALL","WALL","WALL"],
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
  const rooms = { A: roomA, B: roomB, C: roomC, D: roomD, E: roomE, F: roomF };
  const board = roomsToBoard(rooms);
  console.log(board);
  player.addRooms(rooms);
  return (
    <div>
      {board.map((row, y) => (
        <div key={y} className="flex-container">
          {row.map((_cell, x) => {
            const tileLoc = { x, y };
            const room = getRoom(rooms, tileLoc);
            if (!room) {
              return (
                <div className="flex-item">
                  <div className={`Tile void`}></div>
                </div>
              );
            }
            const tile = room.getTile(tileLoc);
            const distance =
              calculateDistance(player.location, tileLoc) * room.cellSize;
            const close = distance <= player.vision;
            return (
              <div className="flex-item">
                <div
                  className={`Tile ${tile.type} ${close ? "close" : "far"}${
                    player.movement.has(hashLocation(tile.location))
                      ? " move"
                      : ""
                  }${
                    hashLocation(player.location) ===
                    hashLocation(tile.location)
                      ? " player"
                      : ""
                  }`}
                  onClick={() => tile.clickHandler(player, setPlayer, room)}
                >
                  {/* <div className="label">{tile.getLabel(player)}</div> */}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
