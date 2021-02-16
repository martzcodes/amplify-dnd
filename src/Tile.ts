import { Location } from "./models/Location";

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

export const getTileSpeed = (tileType: string): number => {
  switch(tileType) {
    case 'void':
    case 'wall':
      return 0;
    default:
      return 5;
  }
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
}
