import { Location } from "./models/Location";

export const tileTypes: Record<string, { class: string; speed: number }> = {
  WLUM: {
    class: `tiles tile-14-13`,
    speed: 0,
  },
  WLUR: {
    class: `tiles tile-14-12`,
    speed: 0,
  },
  WLUL: {
    class: `tiles tile-13-12`,
    speed: 0,
  },
  WLRM: {
    class: `tiles tile-14-13 transform rotate-90`,
    speed: 0,
  },
  WLRU: {
    class: `tiles tile-13-12 transform rotate-90`,
    speed: 0,
  },
  WLRD: {
    class: `tiles tile-14-12 transform rotate-90`,
    speed: 0,
  },
  WLDM: {
    class: `tiles tile-14-13 transform rotate-180`,
    speed: 0,
  },
  WLDR: {
    class: `tiles tile-13-12 transform rotate-180`,
    speed: 0,
  },
  WLDL: {
    class: `tiles tile-14-12 transform rotate-180`,
    speed: 0,
  },
  WLLM: {
    class: `tiles tile-14-13 transform -rotate-90`,
    speed: 0,
  },
  WLLR: {
    class: `tiles tile-14-12 transform -rotate-90`,
    speed: 0,
  },
  WLLD: {
    class: `tiles tile-13-12 transform -rotate-90`,
    speed: 0,
  },
  WOUL: {
    class: `tiles tile-12-12`,
    speed: 0,
  },
  WIUL: {
    class: `tiles tile-15-13`,
    speed: 0,
  },
  WOUR: {
    class: `tiles tile-12-12 transform rotate-90`,
    speed: 0,
  },
  WIUR: {
    class: `tiles tile-15-13 transform rotate-90`,
    speed: 0,
  },
  WODR: {
    class: `tiles tile-12-12 transform rotate-180`,
    speed: 0,
  },
  WIDR: {
    class: `tiles tile-15-13 transform rotate-180`,
    speed: 0,
  },
  WODL: {
    class: `tiles tile-12-12 transform -rotate-90`,
    speed: 0,
  },
  WIDL: {
    class: `tiles tile-15-13 transform -rotate-90`,
    speed: 0,
  },
  WDMU: {
    class: `tiles tile-11-12`,
    speed: 0,
  },
  WDMR: {
    class: `tiles tile-11-12 transform rotate-90`,
    speed: 0,
  },
  WDMD: {
    class: `tiles tile-11-12 transform rotate-180`,
    speed: 0,
  },
  WDML: {
    class: `tiles tile-11-12 transform -rotate-90`,
    speed: 0,
  },
  GRND: {
    class: `tiles tile-15-11`,
    speed: 5,
  },
  DCD: {
    class: `tiles tile-10-12 transform rotate-180`,
    speed: 0,
  },
  DCL: {
    class: `tiles tile-10-12 transform -rotate-90`,
    speed: 0,
  },
  DCR: {
    class: `tiles tile-10-12 transform rotate-90`,
    speed: 0,
  },
  DCU: {
    class: `tiles tile-10-12`,
    speed: 0,
  },
  DLD: {
    class: `tiles tile-10-12 transform rotate-180`,
    speed: 0,
  },
  DLL: {
    class: `tiles tile-10-12 transform -rotate-90`,
    speed: 0,
  },
  DLR: {
    class: `tiles tile-10-12 transform rotate-90`,
    speed: 0,
  },
  DLU: {
    class: `tiles tile-10-12`,
    speed: 0,
  },

  LOCD: {
    class: `tiles tile-10-12 tile-10-13 transform rotate-180`,
    speed: 0,
  },
  LOCL: {
    class: `tiles tile-10-12 tile-10-13 transform -rotate-90`,
    speed: 0,
  },
  LOCR: {
    class: `tiles tile-10-12 tile-10-13 transform rotate-90`,
    speed: 0,
  },
  LOCU: {
    class: `tiles tile-10-12 tile-10-13`,
    speed: 0,
  },
  DOD: {
    class: `tiles tile-10-14 transform rotate-180`,
    speed: 2.5,
  },
  DOL: {
    class: `tiles tile-10-14 transform -rotate-90`,
    speed: 2.5,
  },
  DOR: {
    class: `tiles tile-10-14 transform rotate-90`,
    speed: 2.5,
  },
  DOU: {
    class: `tiles tile-10-14`,
    speed: 2.5,
  },
  WATR: {
    class: `tiles tile-3-11`,
    speed: 10,
  },
  LAVA: {
    class: `tiles tile-3-9`,
    speed: 10,
  },
  VOID: {
    class: "hide",
    speed: 0,
  },
};

export const getTileSpeed = (tileType: string): number => {
  if (tileType in tileTypes) {
    return tileTypes[tileType].speed;
  }
  return 0;
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
  door: string;
  lock: string;
}

function Tile({
  tileClass,
  move,
  fog,
  visible,
  clickHandler,
  door,
  lock,
}: TileProps) {
  return (
    <div className={`Tile LayerTiles`}>
      <div
        className={`Tile Layered ${tileClass} z-10`}
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
      {door ? (
        <div className={`Tile Layered ${door} z-20`}>
          {move && visible ? (
            <div className={`Tile bg-green-300 bg-opacity-50`}></div>
          ) : fog ? (
            <div className={`Tile bg-black bg-opacity-50`}></div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {lock ? (
        <div className={`Tile Layered ${lock} z-30`}>
          {move && visible ? (
            <div className={`Tile bg-green-300 bg-opacity-50`}></div>
          ) : fog ? (
            <div className={`Tile bg-black bg-opacity-50`}></div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Tile;
