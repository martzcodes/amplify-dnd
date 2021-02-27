import { tileTypes } from "./Tile";
import { hashLocation } from "./utils/hashLocation";

function BaseLayer({ board }: { board: string[][] }) {
  return (
    <>
      {board.map((row, y) => (
        <div key={y} className="flex-container">
          {row.map((cell, x) => {
            const tileLoc = { x, y };
            let className = "Tile";

            let cellType = "";
            if (cell in tileTypes) {
              cellType = tileTypes[cell].class;
            } else {
              switch (cell) {
                case "    ":
                  cellType = tileTypes.GRND.class;
                  break;
                case "AQUA":
                  cellType = tileTypes.AQUA.class;
                  break;
                default:
                  break;
              }
              if (cell.startsWith("D")) {
                const directions = [
                  {
                    x: 1,
                    y: 0,
                    door: tileTypes[`${cell.slice(0, 2)}L`],
                    lock: "LOCL",
                    wall: "WLLM",
                  },
                  {
                    x: -1,
                    y: 0,
                    door: tileTypes[`${cell.slice(0, 2)}R`],
                    lock: "LOCR",
                    wall: "WLRM",
                  },
                  {
                    x: 0,
                    y: 1,
                    door: tileTypes[`${cell.slice(0, 2)}U`],
                    lock: "LOCU",
                    wall: "WLUM",
                  },
                  {
                    x: 0,
                    y: -1,
                    door: tileTypes[`${cell.slice(0, 2)}D`],
                    lock: "LOCD",
                    wall: "WLDM",
                  },
                ];
                directions.forEach((dir) => {
                  const dirX = tileLoc.x + dir.x;
                  const dirY = tileLoc.y + dir.y;
                  if (
                    dirX > 0 &&
                    dirY > 0 &&
                    dirX < board[0].length &&
                    dirY < board.length
                  ) {
                    if (
                      board[dirY][dirX] === "    " ||
                      (board[dirY][dirX] in tileTypes &&
                        tileTypes[board[dirY][dirX]].speed > 2.5)
                    ) {
                      cellType = tileTypes[dir.wall].class;
                    }
                  }
                });
              }
            }
            className += ` ${cellType}`;
            return (
              <div key={hashLocation(tileLoc)} className={`flex-item`}>
                <div
                  className={`${className} tile-${x}-${y} text-white`}
                ></div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default BaseLayer;
