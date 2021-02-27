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
    };
    return new TileDetails(tileProps);
  }
}
