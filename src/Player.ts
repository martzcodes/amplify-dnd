import { Location } from "./models/Location";
import { getTileSpeed } from "./Tile";
import { hashLocation, unhashLocation } from "./utils/hashLocation";

export interface PlayerProps {
  name: string;
  location: Location;
  speed: number;
  vision: number;
}

export class Player implements PlayerProps {
  name: string = '';
  location: Location = {
    x: 0,
    y: 0,
  };
  speed: number = 0;
  vision: number = 0;
  board: string[][] = [];
  movement: Set<string> = new Set([]);
  visible: Set<string> = new Set([]);
  revealed: Set<string> = new Set([]);

  constructor(playerProps: PlayerProps) {
    Object.assign(this, playerProps);
  }

  addBoard(board: string[][]) {
    this.board = board;
  }

  async processMovement(board: string[][], noMove: Set<string>) {
    console.log(board);
    console.log(noMove);
    this.movement = new Set([hashLocation(this.location)]);
    this.visible = new Set([hashLocation(this.location)]);
    await this.recrusiveMovement(board, noMove, this.location, 0, {
      [hashLocation(this.location)]: 0,
    });
    await this.processVision(board);
  }

  async recrusiveMovement(
    board: string[][],
    noMove: Set<string>,
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
      if (nextLoc.x < 0 || nextLoc.y < 0) {
        return Promise.resolve();
      }
      const tileType = board[nextLoc.y][nextLoc.x];
      if (noMove.has(tileType)) {
        return Promise.resolve();
      }
      const distance = current + getTileSpeed(tileType);
      if (hashedLoc in cost && distance >= cost[hashedLoc]) {
        return Promise.resolve();
      }
      if (distance <= this.speed) {
        this.movement.add(hashedLoc);
        cost[hashedLoc] = distance;
        return this.recrusiveMovement(board, noMove, nextLoc, distance, cost);
      }
      return Promise.resolve();
    });
    await Promise.all(promises);
  }

  async processVision(board: string[][]) {
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
        if (nextLoc.x < 0 || nextLoc.y < 0) {
          // voids.add(cell);
          obscuredInd = cellInd;
          break;
        }
        const tileType = board[nextLoc.y][nextLoc.x];
        if (!this.visible.has(cell)) {
          if (tileType === "VOID") {
            voids.add(cell);
            obscuredInd = cellInd;
            break;
          }
          if (
            tileType === "WALL" ||
            tileType.startsWith('DC') ||
            tileType.startsWith('DL')
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
    return Promise.resolve(rays);
  }
}

const calculateDistance = (
  moveFrom: { x: number; y: number },
  moveTo: { x: number; y: number }
) => {
  const diffX = Math.abs(moveFrom.x - moveTo.x);
  const diffY = Math.abs(moveFrom.y - moveTo.y);
  return Math.max(diffX, diffY);
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