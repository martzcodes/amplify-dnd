import "./Board.css";
import { PlayerTracker } from "./Game";
import { Location } from "./models/Location";
import { hashLocation } from "./utils/hashLocation";
import { calculateDistance } from './Player';
import { Action } from "./models/Action";
import Tile from "./Tile";

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
            const playerTileName =
              Object.keys(tracker.players).find(
                (playerName) => hashLocation(tracker.players[playerName].location) === tileHashedLocation
              );
            const move = !playerTileName && tracker.players[tracker.active] && tracker.players[tracker.active].movement.tiles.has(tileHashedLocation);
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
            if (!playerTileName) {
              let cellType = "";
              if (visible || fog || revealed) {
                switch (cell) {
                  case "    ":
                    cellType = "bg-white";
                    break;
                  case "WATR":
                    cellType = "bg-blue-300";
                    break;
                  case "WALL":
                    cellType = "bg-pink-600";
                    break;
                  default:
                    cellType = "";
                    break;
                }
                className += ` ${cellType}`;
              }
              if (visible) {
                className += ` visible`;
              } else if (!revealed) {
                className += ` hide`;
              }
              if (selected) {
                className += " ring-4 ring-inset"
              }
            } else {
              className += ` ${
                Object.values(tracker.players).filter(
                  (player) =>
                    hashLocation(player.location) ===
                    tileHashedLocation
                )[0].color
              }`;
            }
            return (
              <div key={hashLocation(tileLoc)} className={`flex-item`}>
                <Tile tileClass={className} clickHandler={() => {
                  setSelectedTile({
                      player: tracker.active,
                      location: tileLoc,
                      type: cell,
                      playerAtTile:
                        playerTileName ? tracker.players[playerTileName].getStats() : null,
                      actions,
                    });
                }} fog={fog} visible={visible} move={move}></Tile>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default Board;
