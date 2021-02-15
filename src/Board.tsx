import { useEffect, useState } from "react";
import "./Board.css";
import { Location } from "./models/Location";
import { Room, roomA, roomB, roomC, roomD, roomE, roomF } from "./Room";
import { hashLocation, unhashLocation } from "./utils/hashLocation";

export interface Bounds {
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

export class Tile implements TileProps {
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

  async clickHandler(player: Player, setPlayerProps: any) {
    const loc = this.location;
    if (player.movement.has(hashLocation(loc))) {
      await player.processMovement();
      setPlayerProps({ ...player, location: { x: loc.x, y: loc.y } });
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

export interface Door {
  name: string;
  location: Location;
  open: boolean;
  locked: boolean;
  room?: string;
}

interface PlayerProps {
  location: Location;
  speed: number;
  vision: number;
}

export class Player implements PlayerProps {
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
  }

  async processMovement() {
    this.movement = new Set([hashLocation(this.location)]);
    this.visible = new Set([hashLocation(this.location)]);
    await this.recrusiveMovement(this.location, 0, {
      [hashLocation(this.location)]: 0,
    });
    await this.processVision();
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
    const promises = directions.map((move) => {
      const nextLoc: Location = {
        x: loc.x + move.x,
        y: loc.y + move.y,
      };
      const hashedLoc = hashLocation(nextLoc);
      const nextRoom = getRoom(this.rooms, nextLoc);
      if (!nextRoom) {
        return Promise.resolve();
      }
      const tile = nextRoom.getTile(nextLoc);
      const distance = current + tile.size;
      if (hashedLoc in cost && distance >= cost[hashedLoc]) {
        return Promise.resolve();
      }
      if (tile && !noMove.has(tile.type) && distance <= this.speed) {
        this.movement.add(hashedLoc);
        cost[hashedLoc] = distance;
        return this.recrusiveMovement(nextLoc, distance, cost);
      }
      return Promise.resolve();
    });
    await Promise.all(promises);
  }

  async processVision() {
    this.visible = new Set([]);
    const maxVisionCells: Set<string> = new Set([]);
    const maxCellDistance = this.vision / 5;
    for (let j = -maxCellDistance; j < maxCellDistance; j++) {
      maxVisionCells.add(
        hashLocation({
          x: this.location.x - maxCellDistance,
          y: this.location.y + j,
        })
      );
      maxVisionCells.add(
        hashLocation({
          x: this.location.x + maxCellDistance,
          y: this.location.y + j,
        })
      );
      maxVisionCells.add(
        hashLocation({
          x: this.location.x + j,
          y: this.location.y - maxCellDistance,
        })
      );
      maxVisionCells.add(
        hashLocation({
          x: this.location.x + j,
          y: this.location.y + maxCellDistance,
        })
      );
    }
    const paths = Array.from(maxVisionCells).map((cell) =>
      plotLine(this.location, unhashLocation(cell))
    );
    const voids: Set<string> = new Set([]);
    const rays = paths.map((path) => {
      let obscuredInd = -1;
      for (let cellInd = 0; cellInd < path.length; cellInd++) {
        const cell = path[cellInd];
        if (voids.has(cell)) {
          obscuredInd = cellInd;
          break;
        }
        if (!this.visible.has(cell)) {
          const nextRoom = getRoom(this.rooms, unhashLocation(cell));
          if (!nextRoom) {
            obscuredInd = cellInd;
            break;
          }
          const tile = nextRoom.getTile(unhashLocation(cell));
          if (tile.type === "void") {
            voids.add(cell);
            obscuredInd = cellInd;
            break;
          }
          if (
            tile.type === "wall" ||
            tile.type === "door-closed" ||
            tile.type === "door-locked"
          ) {
            this.revealed.add(cell);
            if (cellInd + 1 < path.length - 1) {
              obscuredInd = cellInd + 1;
            }
            break;
          }
          this.visible.add(cell);
          this.revealed.add(cell);
        }
      }
      if (obscuredInd !== -1) {
        return path.slice(0, obscuredInd);
      }
      return path;
    });
    return Promise.resolve();
  }
}

const plotLine = (start: Location, end: Location) => {
  const path: string[] = [];
  let dx = Math.abs(end.x - start.x);
  let sx = start.x < end.x ? 1 : -1;
  let dy = -Math.abs(end.y - start.y);
  let sy = start.y < end.y ? 1 : -1;
  let err = dx + dy; /* error value e_xy */
  let x = start.x;
  let y = start.y;
  while (true) {
    path.push(hashLocation({ x, y }));
    if (x === end.x && y === end.y) break;
    let e2 = 2 * err;
    if (e2 >= dy) {
      /* e_xy+e_x > 0 */
      err += dy;
      x += sx;
    }
    if (e2 <= dx) {
      /* e_xy+e_y < 0 */
      err += dx;
      y += sy;
    }
  }
  return path;
};

const initialPlayerProps: PlayerProps = {
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

export const roomsToBoard = (rooms: Record<string, Room>): string[][] => {
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
        board[rowInd + room.offset.y][colInd + room.offset.x] = cell;
      });
    });
  });
  return board;
};

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

function Board() {
  const [playerProps, setPlayerProps] = useState(initialPlayerProps);
  const [player, setPlayer] = useState<Player>();
  const [rooms] = useState<Record<string, Room>>({
    A: roomA,
    B: roomB,
    C: roomC,
    D: roomD,
    E: roomE,
    F: roomF,
  });
  const [board] = useState(roomsToBoard(rooms));

  useEffect(() => {
    const generatePlayer = async () => {
      const generatedPlayer = new Player(playerProps);
      generatedPlayer.addRooms(rooms);
      await generatedPlayer.processMovement();
      setPlayer(generatedPlayer);
    };

    generatePlayer();
  }, [playerProps, rooms]);

  return player ? (
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
            const visible = player.visible.has(hashLocation(tile.location));
            const revealed = player.revealed.has(hashLocation(tile.location));
            const fog = !visible && revealed;
            return (
              <div className="flex-item">
                <div
                  className={`Tile ${tile.type}${visible ? " visible" : ""}${
                    fog ? " fog" : ""
                  }${!revealed ? " hidden" : ""}${
                    player.movement.has(hashLocation(tile.location))
                      ? " move"
                      : ""
                  }${
                    hashLocation(player.location) ===
                    hashLocation(tile.location)
                      ? " player"
                      : ""
                  }`}
                  onClick={() => tile.clickHandler(player, setPlayerProps)}
                >
                  {/* <div className="label">{tile.getLabel(player)}</div> */}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
}

export default Board;
