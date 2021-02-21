import "./Board.css";
import { PlayerTracker } from "./Game";
import { Location } from "./models/Location";
import { hashLocation } from "./utils/hashLocation";
import { calculateDistance } from "./Player";
import { Action } from "./models/Action";
import Tile, { tileTypes } from "./Tile";
import { Door } from "./Door";

export interface Bounds {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

function InteractionLayer({
  selectedTile,
  setSelectedTile,
  width,
  height,
  doors,
}: {
  selectedTile: { location: Location; actions: Action[] };
  setSelectedTile: any;
  width: number;
  height: number;
  doors: Door[];
}) {
  const board = Array(height)
    .fill("")
    .map((row, y) => (
      <div key={y} className="flex-container">
        {Array(width)
          .fill("")
          .map((cell, x) => {
            const tileLoc = { x, y };
            return (
              <div
                key={hashLocation(tileLoc)}
                className="flex-item"
                onClick={() => {
                  console.log(tileLoc);
                  setSelectedTile({
                    player: "",
                    location: tileLoc,
                    type: "",
                    actions: [],
                  });
                }}
              ></div>
            );
          })}
      </div>
    ));
  doors.forEach((door) => {
    const specificDoors = door.getDoors();
    specificDoors.forEach((specificDoor) => {
      board[specificDoor.location.y].props.children[specificDoor.location.x] = (
        <div key={hashLocation(specificDoor.location)} className="flex-item">
          <Tile
            door={tileTypes[specificDoor.doorClass].class || ""}
            lock={(tileTypes[specificDoor.lockClass] || {}).class || ""}
            tileClass={""}
            clickHandler={() => {
              setSelectedTile({
                player: "",
                location: specificDoor.location,
                type: "DOOR",
                playerAtTile: null,
                actions: [],
              });
            }}
            fog={false}
            visible={true}
            move={false}
          ></Tile>
        </div>
      );
    });
  });
  return <>{board}</>;
  // return (
  //   <>
  //     {Array(height).fill('').map((row, y) => (
  //       <div key={y} className="flex-container">
  //         {Array(width).fill('').map((cell, x) => {
  //           const tileLoc = { x, y };
  //           const tileHash = hashLocation(tileLoc);
  //           return (
  //             <div key={hashLocation(tileLoc)} className={`flex-item`}>
  // <Tile
  //   door={door}
  //   lock={lock}
  //   tileClass={className}
  //   clickHandler={() => {
  //     setSelectedTile({
  //       player: tracker.active,
  //       location: tileLoc,
  //       type: cell,
  //       playerAtTile: playerTileName
  //         ? tracker.players[playerTileName].getStats()
  //         : null,
  //       actions,
  //     });
  //   }}
  //   fog={cell.startsWith("W") && revealed ? false : fog}
  //   visible={visible}
  //   move={move}
  // ></Tile>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     ))}
  //   </>
  // );
}

export default InteractionLayer;
