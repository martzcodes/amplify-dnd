import "./Board.css";
import { Location } from "./models/Location";
import { Player } from "./Player";
import { hashLocation } from "./utils/hashLocation";

export interface Bounds {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

function Board({
  selectedTile,
  setSelectedTile,
  player,
  board,
}: {
  selectedTile: { location: Location; actions: any[] };
  setSelectedTile: any;
  player: Player;
  board: string[][];
}) {
  return (
    <>
      {board.map((row, y) => (
        <div key={y} className="flex-container">
          {row.map((cell, x) => {
            const tileLoc = { x, y };
            const tileHashedLocation = hashLocation(tileLoc);
            const visible = player.visible.has(tileHashedLocation);
            const revealed = player.revealed.has(tileHashedLocation);
            const fog = !visible && revealed;
            const selected =
              hashLocation(selectedTile.location) === tileHashedLocation;
            const move = player.movement.has(tileHashedLocation);
            const actions = move ? ["move"] : [];
            const playerTile = hashLocation(player.location) === tileHashedLocation;
            let className = "Tile";
            if (visible || fog || revealed) {
              className += ` ${cell}`;
            }
            if (visible) {
              className += ` visible`;
            } else if (fog) {
              className += ` fog`;
            } else if (!revealed) {
              className += ` hide`;
            }
            if (move) {
              className += ` move`;
            }
            if (playerTile) {
              className += ` player`;
            }
            return (
              <div
                className={`flex-item${
                  selected ? " focus:ring-4 ring-inset" : ""
                }`}
              >
                <div
                  className={className}
                  onClick={() => {
                    setSelectedTile({
                      location: tileLoc,
                      type: cell,
                      actions,
                    });
                    // tile.clickHandler(player, setPlayerProps);
                  }}
                >
                  {/* <div className="label">{tile.getLabel(player)}</div> */}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default Board;
