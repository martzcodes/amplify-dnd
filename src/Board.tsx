import "./Board.css";
import { PlayerTracker } from "./Game";
import { Location } from "./models/Location";
import { hashLocation } from "./utils/hashLocation";
import { calculateDistance } from './Player';
import { Action } from "./models/Action";

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
              Object.values(tracker.players).filter((player) => player.visible.has(tileHashedLocation))
                .length !== 0;
            const revealed =
              Object.values(tracker.players).filter((player) =>
                player.revealed.has(tileHashedLocation)
              ).length !== 0;
            const fog = !visible && revealed;
            const selected = tracker.players[tracker.active] &&
              hashLocation(selectedTile.location) === tileHashedLocation;
            const playerTile =
              Object.values(tracker.players).filter(
                (player) => hashLocation(player.location) === tileHashedLocation
              ).length !== 0;
            const move = !playerTile && tracker.players[tracker.active] && tracker.players[tracker.active].movement.tiles.has(tileHashedLocation);
            const actions: any[] = [];
            if (move) {
              actions.push({
                name: "Move",
                type: "move",
                color: "blue",
              });
            }
            if (tracker.players[tracker.active]) {
              if (cell.startsWith("DL")) {
                const doorDistance = calculateDistance(
                  tracker.players[tracker.active].location,
                  tileLoc
                );
                console.log(`DL: ${doorDistance}`);
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
                  console.log(actions);
                }
              }
            if (cell.startsWith("DC")) {
              const doorDistance = calculateDistance(
                tracker.players[tracker.active].location,
                tileLoc
              );
              console.log(`DC: ${doorDistance}`);
              if (doorDistance <= 5) {
                actions.push({
                  name: "Open",
                  type: "open",
                  color: "blue",
                });
              }
            }
          }
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
                className += ` ${cell === '    ' ? 'ground' : cell}`;
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
              if (selected) {
                className += " ring-4 ring-inset"
              }
            }
            return (
              <div key={hashLocation(tileLoc)} className={`flex-item`}>
                <div
                  className={className}
                  onClick={() => {
                    setSelectedTile({
                      player: tracker.active,
                      location: tileLoc,
                      type: `${cell === "    " ? "ground" : cell}`,
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
