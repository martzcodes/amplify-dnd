import "./Board.css";
import { PlayerTracker } from "./Game";
import { Location } from "./models/Location";
import { hashLocation } from "./utils/hashLocation";
import { calculateDistance } from "./Player";
import { Action } from "./models/Action";
import Tile, { tileTypes } from "./Tile";

export interface Bounds {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

function Board({
  selectedTile,
  setSelectedTile,
  tracker,
  board,
}: {
  selectedTile: { location: Location; actions: Action[] };
  setSelectedTile: any;
  tracker: PlayerTracker;
  board: string[][];
}) {
  return (
    <>
      {board.map((row, y) => (
        <div key={y} className="flex-container">
          {row.map((cell, x) => {
            const tileLoc = { x, y };
            const tileHashedLocation = hashLocation(tileLoc);
            const visible =
              Object.values(tracker.players).filter((player) =>
                player.visible.has(tileHashedLocation)
              ).length !== 0;
            const revealed =
              Object.values(tracker.players).filter((player) =>
                player.revealed.has(tileHashedLocation)
              ).length !== 0;
            const fog = !visible && revealed ;
            const selected =
              tracker.players[tracker.active] &&
              hashLocation(selectedTile.location) === tileHashedLocation;
            const playerTileName = Object.keys(tracker.players).find(
              (playerName) =>
                hashLocation(tracker.players[playerName].location) ===
                tileHashedLocation
            );
            const move =
              !playerTileName &&
              tracker.players[tracker.active] &&
              tracker.players[tracker.active].movement.tiles.has(
                tileHashedLocation
              );
            const actions: any[] = [];
            if (move) {
              actions.push({
                name: "Move",
                type: "move",
                color: "blue",
              });
            }
            if (
              tracker.players[tracker.active] &&
              !tracker.players[tracker.active].actionUsed
            ) {
              if (cell.startsWith("DL")) {
                const doorDistance = calculateDistance(
                  tracker.players[tracker.active].location,
                  tileLoc
                );
                if (doorDistance <= 5) {
                  actions.push({
                    name: "Unlock",
                    type: "unlock",
                    color: "yellow",
                  });
                  actions.push({
                    name: "Break",
                    type: "break",
                    color: "red",
                  });
                }
              }
              if (cell.startsWith("DC")) {
                const doorDistance = calculateDistance(
                  tracker.players[tracker.active].location,
                  tileLoc
                );
                if (doorDistance <= 5) {
                  actions.push({
                    name: "Open",
                    type: "open",
                    color: "blue",
                  });
                }
              }
              if (cell.startsWith("DO")) {
                const doorDistance = calculateDistance(
                  tracker.players[tracker.active].location,
                  tileLoc
                );
                if (doorDistance === 5) {
                  actions.push({
                    name: "Close Door",
                    type: "close",
                    color: "blue",
                  });
                }
              }
            }
            let className = "Tile";
            let door = "";
            let lock = "";

            if (!playerTileName) {
              let cellType = "";
              if (visible || fog || revealed) {
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
                  if (cell.startsWith('D')) {
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
                      if (dirX > 0 && dirY > 0 && dirX < board[0].length && dirY < board.length) {
                        if (board[dirY][dirX] === '    ' || (board[dirY][dirX] in tileTypes && tileTypes[board[dirY][dirX]].speed > 2.5)) {
                          cellType = tileTypes[dir.wall].class;
                          door = dir.door.class;
                          if (cell.startsWith('DL')) {
                            lock = tileTypes[dir.lock].class;
                          }
                        }
                      }
                    })
                  }
                }
                className += ` ${cellType}`;
              }
              if (visible) {
                className += ` visible`;
              } else if (!revealed) {
                className += ` hide`;
              }
              if (selected) {
                className += " ring-4 ring-inset";
              }
            } else {
              className += ` ${
                Object.values(tracker.players).filter(
                  (player) =>
                    hashLocation(player.location) === tileHashedLocation
                )[0].color
              }`;
            }
            return (
              <div key={hashLocation(tileLoc)} className={`flex-item`}>
                <Tile
                  door={door}
                  lock={lock}
                  tileClass={className}
                  clickHandler={() => {
                    setSelectedTile({
                      player: tracker.active,
                      location: tileLoc,
                      type: cell,
                      playerAtTile: playerTileName
                        ? tracker.players[playerTileName].getStats()
                        : null,
                      actions,
                    });
                  }}
                  fog={cell.startsWith('W') && revealed ? false : fog}
                  visible={visible}
                  move={move}
                ></Tile>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default Board;
