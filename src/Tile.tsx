import { Location } from "./models/Location";

export const getTileSpeed = (tileType: string): number => {
  switch (tileType) {
    case "VOID":
    case "WALL":
      return 0;
    case "WATR":
      return 10;
    default:
      return 5;
  }
};

export interface TileDetailsProps {
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
export class TileDetails implements TileDetailsProps {
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

  constructor(tileProps: TileDetailsProps) {
    Object.assign(this, tileProps);
  }
}

export interface TileProps {
  tileClass: string;
  move: boolean;
  fog: boolean;
  visible: boolean;
  clickHandler: any;
}

function Tile({ tileClass, move, fog, visible, clickHandler }: TileProps) {
  return (
    <div
      className={tileClass}
      onClick={() => {
        clickHandler();
      }}
    >
      {move && visible ? (
        <div className={`Tile bg-green-300 bg-opacity-50`}></div>
      ) : fog ? (
        <div className={`Tile bg-black bg-opacity-50`}></div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Tile;
