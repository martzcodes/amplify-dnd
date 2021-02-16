import "./Board.css";
import { PlayerTracker } from "./Game";
import { Location } from "./models/Location";
import { hashLocation } from "./utils/hashLocation";

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
  selectedTile: { location: Location; actions: any[] };
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
              Object.values(tracker.players).filter((player) => player.visible.has(tileHashedLocation))
                .length !== 0;
            const revealed =
              Object.values(tracker.players).filter((player) =>
                player.revealed.has(tileHashedLocation)
              ).length !== 0;
            const fog = !visible && revealed;
            const selected =
              hashLocation(selectedTile.location) === tileHashedLocation;
            const move = tracker.players[tracker.active].movement.tiles.has(tileHashedLocation)
            const actions = move ? ["move"] : [];
            const playerTile =
              Object.values(tracker.players).filter(
                (player) => hashLocation(player.location) === tileHashedLocation
              ).length !== 0;
            let className = "Tile";
            if (playerTile) {
              className += ` ${
                Object.values(tracker.players).filter(
                  (player) =>
                    hashLocation(player.location) === tileHashedLocation
                )[0].color
              }`;
            } else {
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
                      player: tracker.active,
                      location: tileLoc,
                      type: cell,
                      actions,
                    });
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default Board;
