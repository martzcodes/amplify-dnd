import { Location } from "./models/Location";

export const tileTypes: Record<string, { class: string; speed: number }> = {
  WLUM: {
    class: `sprites sprite-14-13`,
    speed: 999,
  },
  WLUR: {
    class: `sprites sprite-14-12`,
    speed: 999,
  },
  WLUL: {
    class: `sprites sprite-13-12`,
    speed: 999,
  },
  WLRM: {
    class: `sprites sprite-14-13 transform rotate-90`,
    speed: 999,
  },
  WLRU: {
    class: `sprites sprite-13-12 transform rotate-90`,
    speed: 999,
  },
  WLRD: {
    class: `sprites sprite-14-12 transform rotate-90`,
    speed: 999,
  },
  WLDM: {
    class: `sprites sprite-14-13 transform rotate-180`,
    speed: 999,
  },
  WLDR: {
    class: `sprites sprite-13-12 transform rotate-180`,
    speed: 999,
  },
  WLDL: {
    class: `sprites sprite-14-12 transform rotate-180`,
    speed: 999,
  },
  WLLM: {
    class: `sprites sprite-14-13 transform -rotate-90`,
    speed: 999,
  },
  WLLR: {
    class: `sprites sprite-14-12 transform -rotate-90`,
    speed: 999,
  },
  WLLD: {
    class: `sprites sprite-13-12 transform -rotate-90`,
    speed: 999,
  },
  WOUL: {
    class: `sprites sprite-12-12`,
    speed: 999,
  },
  WIUL: {
    class: `sprites sprite-15-13`,
    speed: 999,
  },
  WOUR: {
    class: `sprites sprite-12-12 transform rotate-90`,
    speed: 999,
  },
  WIUR: {
    class: `sprites sprite-15-13 transform rotate-90`,
    speed: 999,
  },
  WODR: {
    class: `sprites sprite-12-12 transform rotate-180`,
    speed: 999,
  },
  WIDR: {
    class: `sprites sprite-15-13 transform rotate-180`,
    speed: 999,
  },
  WODL: {
    class: `sprites sprite-12-12 transform -rotate-90`,
    speed: 999,
  },
  WIDL: {
    class: `sprites sprite-15-13 transform -rotate-90`,
    speed: 999,
  },
  WDMU: {
    class: `sprites sprite-11-12`,
    speed: 999,
  },
  WDMR: {
    class: `sprites sprite-11-12 transform rotate-90`,
    speed: 999,
  },
  WDMD: {
    class: `sprites sprite-11-12 transform rotate-180`,
    speed: 999,
  },
  WDML: {
    class: `sprites sprite-11-12 transform -rotate-90`,
    speed: 999,
  },
  GRND: {
    class: `sprites sprite-15-11`,
    speed: 5,
  },
  DRCN: {
    class: `sprites sprite-10-12 transform rotate-180`,
    speed: 999,
  },
  DRCE: {
    class: `sprites sprite-10-12 transform -rotate-90`,
    speed: 999,
  },
  DRCW: {
    class: `sprites sprite-10-12 transform rotate-90`,
    speed: 999,
  },
  DRCS: {
    class: `sprites sprite-10-12`,
    speed: 999,
  },
  DRLN: {
    class: `sprites sprite-10-13 transform rotate-180`,
    speed: 999,
  },
  DRLE: {
    class: `sprites sprite-10-13 transform -rotate-90`,
    speed: 999,
  },
  DRLW: {
    class: `sprites sprite-10-13 transform rotate-90`,
    speed: 999,
  },
  DRLS: {
    class: `sprites sprite-10-13`,
    speed: 999,
  },
  DRON: {
    class: `sprites sprite-10-14 transform rotate-180`,
    speed: 2.5,
  },
  DROE: {
    class: `sprites sprite-10-14 transform -rotate-90`,
    speed: 2.5,
  },
  DROW: {
    class: `sprites sprite-10-14 transform rotate-90`,
    speed: 2.5,
  },
  DROS: {
    class: `sprites sprite-10-14`,
    speed: 2.5,
  },
  AQUA: {
    class: `sprites sprite-3-11`,
    speed: 10,
  },
  LAVA: {
    class: `sprites sprite-3-9`,
    speed: 10,
  },
  VOID: {
    class: "hide",
    speed: 999,
  },
};

export const getTileSpeed = (tileType: string): number => {
  if (Object.keys(tileTypes).includes(tileType)) {
    return tileTypes[tileType].speed;
  }
  if (tileType.startsWith("DRO")) {
    return 2.5;
  }
  return 999;
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
  revealed: boolean;
  visible: boolean;
  clickHandler: any;
  door?: string;
  lock?: string;
  content?: string;
}

function Tile({
  tileClass,
  move,
  revealed,
  visible,
  clickHandler,
  door,
  lock,
  content,
}: TileProps) {
  const moveClass = `bg-green-200 bg-opacity-20 border border-green-600`;
  const fogClass = `bg-black bg-opacity-30`;
  return !visible && !revealed ? (
    <div className={`Tile bg-black`}></div>
  ) : (
    <div className={`Tile LayerTile`}>
      <div
        className={`Tile Layered ${tileClass} bg-opacity-50 z-10`}
        onClick={() => {
          clickHandler();
        }}
      >
        {move && visible ? (
          <div className={`Tile ${moveClass}`}></div>
        ) : !visible && revealed ? (
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
          ) : !visible && revealed ? (
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
          ) : !visible && revealed ? (
            <div className={`Tile ${fogClass}`}></div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {content ? (
        <div className="Tile Layered z-40 text-white">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          preserveAspectRatio="xMinYMin"
          viewBox="0 0 200 200"
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="central"
            dominantBaseline="central"
            fontSize="72px"
            fill="white"
          >
            {content}
          </text>
        </svg>
        </div>) : <></>
      }
    </div>
  );
}

export default Tile;
