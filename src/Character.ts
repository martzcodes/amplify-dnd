import { Action } from "./models/Action";
import { Location } from "./models/Location";
import { hashLocation, unhashLocation } from "./utils/hashLocation";

export interface CharacterProps {
  id?: string;
  name: string;
  email: string;
  color: string;
  perception: number;
  speed: Speed;
  hp: HP;
  vision: number;
  actionUsed: boolean;
  location: Location;
  selectedTile?: null | {
    location: Location;
    actions: Action[];
  }
}

export interface Speed {
  max: number;
  current: number;
}

export interface HP {
  max: number;
  current: number;
}

export interface Movement {
  cost: Record<string, number>;
  tiles: Set<string>;
}

export class Character implements CharacterProps {
  id: string = '';
  name: string = '';
  email: string = '';
  color: string = 'bg-purple-600';
  perception: number = 0;
  location: Location = {
    x: 0,
    y: 0,
  };
  speed: Speed = {
    max: 30,
    current: 30,
  };
  hp: HP = {
    max: 10,
    current: 10,
  };
  vision: number = 0;
  movement: Movement = {
    cost: {},
    tiles: new Set<string>([]),
  };
  visible: Set<string> = new Set([]);
  revealed: Set<string> = new Set([]);
  actionUsed: boolean = false;
  selectedTile: null | {
    location: Location;
    actions: Action[];
  } = null;

  constructor(playerProps: CharacterProps) {
    Object.assign(this, playerProps);
  }

  get damage() {
    return this.hp.max - this.hp.current;
  }

  getStats() {
    return {
      name: this.name,
      damage: this.damage,
    }
  }

  async move(moveMap: number[][], location: Location) {
    this.location = location;
    this.speed.current -= this.movement.cost[hashLocation(this.location)];
    await this.processMovement();
    await this.recursiveMovement(moveMap, this.location, 0);
  }

  async processMovement() {
    this.movement = {
      cost: {
        [hashLocation(this.location)]: 0
      },
      tiles: new Set([hashLocation(this.location)]),
    };
    this.visible = new Set([hashLocation(this.location)]);
  }

  async recursiveMovement(
    moveMap: number[][],
    loc: Location,
    current: number,
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
      if (!moveMap.length || nextLoc.x < 0 || nextLoc.y < 0 || nextLoc.y >= moveMap.length || nextLoc.x >= moveMap[0].length) {
        return Promise.resolve();
      }
      const tileSpeed = moveMap[nextLoc.y][nextLoc.x];
      const distance = current + tileSpeed;
      if (hashedLoc in this.movement.cost && distance >= this.movement.cost[hashedLoc]) {
        return Promise.resolve();
      }
      if (distance <= this.speed.current) {
        this.movement.tiles.add(hashedLoc);
        this.movement.cost[hashedLoc] = distance;
        return this.recursiveMovement(moveMap, nextLoc, distance);
      }
      return Promise.resolve();
    });
    await Promise.all(promises);
  }

  async processVision(sightMap: boolean[][][]) {
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
        const nextLoc = unhashLocation(cell);
        if (!sightMap.length || nextLoc.x < 0 || nextLoc.y < 0 || nextLoc.y >= sightMap.length || nextLoc.x >= sightMap[0].length) {
          // voids.add(cell);
          obscuredInd = cellInd;
          break;
        }
        const tileVisible = sightMap[nextLoc.y][nextLoc.x][0];
        const tileBlocksSight = sightMap[nextLoc.y][nextLoc.x][1];
          if (!tileVisible) {
            voids.add(cell);
            obscuredInd = cellInd;
            break;
          }
          if (tileBlocksSight) {
            this.revealed.add(cell);
            this.visible.add(cell);
            if (cellInd + 1 < path.length - 1) {
              obscuredInd = cellInd + 1;
            }
            break;
          }
          this.visible.add(cell);
          this.revealed.add(cell);
      }
      if (obscuredInd !== -1) {
        return path.slice(0, obscuredInd);
      }
      return path;
    });
    return Promise.resolve(rays);
  }
}

export const calculateDistance = (
  moveFrom: { x: number; y: number },
  moveTo: { x: number; y: number }
) => {
  const diffX = Math.abs(moveFrom.x - moveTo.x);
  const diffY = Math.abs(moveFrom.y - moveTo.y);
  return Math.max(diffX, diffY) * 5;
};

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