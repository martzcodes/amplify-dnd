import { Location } from "./models/Location";

export const tileTypes: Record<string, { class: string; speed: number }> = {
  WLUM: {
    class: `tiles tile-14-13`,
    speed: 100000,
  },
  WLUR: {
    class: `tiles tile-14-12`,
    speed: 100000,
  },
  WLUL: {
    class: `tiles tile-13-12`,
    speed: 100000,
  },
  WLRM: {
    class: `tiles tile-14-13 transform rotate-90`,
    speed: 100000,
  },
  WLRU: {
    class: `tiles tile-13-12 transform rotate-90`,
    speed: 100000,
  },
  WLRD: {
    class: `tiles tile-14-12 transform rotate-90`,
    speed: 100000,
  },
  WLDM: {
    class: `tiles tile-14-13 transform rotate-180`,
    speed: 100000,
  },
  WLDR: {
    class: `tiles tile-13-12 transform rotate-180`,
    speed: 100000,
  },
  WLDL: {
    class: `tiles tile-14-12 transform rotate-180`,
    speed: 100000,
  },
  WLLM: {
    class: `tiles tile-14-13 transform -rotate-90`,
    speed: 100000,
  },
  WLLR: {
    class: `tiles tile-14-12 transform -rotate-90`,
    speed: 100000,
  },
  WLLD: {
    class: `tiles tile-13-12 transform -rotate-90`,
    speed: 100000,
  },
  WOUL: {
    class: `tiles tile-12-12`,
    speed: 100000,
  },
  WIUL: {
    class: `tiles tile-15-13`,
    speed: 100000,
  },
  WOUR: {
    class: `tiles tile-12-12 transform rotate-90`,
    speed: 100000,
  },
  WIUR: {
    class: `tiles tile-15-13 transform rotate-90`,
    speed: 100000,
  },
  WODR: {
    class: `tiles tile-12-12 transform rotate-180`,
    speed: 100000,
  },
  WIDR: {
    class: `tiles tile-15-13 transform rotate-180`,
    speed: 100000,
  },
  WODL: {
    class: `tiles tile-12-12 transform -rotate-90`,
    speed: 100000,
  },
  WIDL: {
    class: `tiles tile-15-13 transform -rotate-90`,
    speed: 100000,
  },
  WDMU: {
    class: `tiles tile-11-12`,
    speed: 100000,
  },
  WDMR: {
    class: `tiles tile-11-12 transform rotate-90`,
    speed: 100000,
  },
  WDMD: {
    class: `tiles tile-11-12 transform rotate-180`,
    speed: 100000,
  },
  WDML: {
    class: `tiles tile-11-12 transform -rotate-90`,
    speed: 100000,
  },
  GRND: {
    class: `tiles tile-15-11`,
    speed: 5,
  },
  DCD: {
    class: `tiles tile-10-12 transform rotate-180`,
    speed: 100000,
  },
  DCL: {
    class: `tiles tile-10-12 transform -rotate-90`,
    speed: 100000,
  },
  DCR: {
    class: `tiles tile-10-12 transform rotate-90`,
    speed: 100000,
  },
  DCU: {
    class: `tiles tile-10-12`,
    speed: 100000,
  },
  DLD: {
    class: `tiles tile-10-12 transform rotate-180`,
    speed: 100000,
  },
  DLL: {
    class: `tiles tile-10-12 transform -rotate-90`,
    speed: 100000,
  },
  DLR: {
    class: `tiles tile-10-12 transform rotate-90`,
    speed: 100000,
  },
  DLU: {
    class: `tiles tile-10-12`,
    speed: 100000,
  },

  LOCD: {
    class: `tiles tile-10-12 tile-10-13 transform rotate-180`,
    speed: 100000,
  },
  LOCL: {
    class: `tiles tile-10-12 tile-10-13 transform -rotate-90`,
    speed: 100000,
  },
  LOCR: {
    class: `tiles tile-10-12 tile-10-13 transform rotate-90`,
    speed: 100000,
  },
  LOCU: {
    class: `tiles tile-10-12 tile-10-13`,
    speed: 100000,
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
    speed: 100000,
  },
};

export const getTileSpeed = (tileType: string): number => {
  if (Object.keys(tileTypes).includes(tileType)) {
    return tileTypes[tileType].speed;
  }
  if (tileType.startsWith('DO')) {
    return 2.5;
  }
  return 100000;
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
  const moveClass = `bg-green-300 bg-opacity-30`;
  const fogClass = `bg-black-300 bg-opacity-30`;
  return (
    <div className={`Tile LayerTile`}>
      <div
        className={`Tile Layered ${tileClass} z-10`}
        onClick={() => {
          clickHandler();
        }}
      >
        {move && visible ? (
          <div className={`Tile ${moveClass}`}></div>
        ) : fog ? (
          <div className={`Tile ${fogClass}`}></div>
        ) : (
          <></>
        )}
      </div>
      {door ? (
        <div
          className={`Tile Layered ${door} z-20`}
          onClick={() => {
            clickHandler();
          }}
        >
          {move && visible ? (
            <div className={`Tile ${moveClass}`}></div>
          ) : fog ? (
            <div className={`Tile ${fogClass}`}></div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {lock ? (
        <div
          className={`Tile Layered ${lock} z-30`}
          onClick={() => {
            clickHandler();
          }}
        >
          {move && visible ? (
            <div className={`Tile ${moveClass}`}></div>
          ) : fog ? (
            <div className={`Tile ${fogClass}`}></div>
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
