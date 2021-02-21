import "./Game.css";
import { PlayerTracker } from "./Game";
import { Location } from "./models/Location";
import { hashLocation } from "./utils/hashLocation";
import { calculateDistance, Player } from "./Player";
import { Action } from "./models/Action";
import Tile, { tileTypes } from "./Tile";
import { Door } from "./Door";
import { Renderable } from "./UserLayer";

export interface Bounds {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

const canMove = ({
  player,
  tileLoc,
  renderable,
}: {
  player: Player;
  tileLoc: Location;
  renderable: Renderable[];
}): boolean => {
  if (player.movement.tiles.has(hashLocation(tileLoc))) {
    if (
      renderable.filter(
        (renderItem) =>
          renderItem.location.x === tileLoc.x &&
          renderItem.location.y === tileLoc.y
      ).length !== 0
    ) {
      return false;
    }
    return true;
  }
  return false;
};

function InteractionLayer({
  selectedTile,
  setSelectedTile,
  width,
  height,
  doors,
  player,
  renderable,
  dm,
}: {
  selectedTile: { location: Location; actions: Action[] };
  setSelectedTile: any;
  width: number;
  height: number;
  doors: Door[];
  player: Player;
  renderable: Renderable[];
  dm?: boolean;
}) {
  const board = Array(height)
    .fill("")
    .map((row, y) => (
      <div key={y} className="flex-container">
        {Array(width)
          .fill("")
          .map((cell, x) => {
            const tileLoc = { x, y };
            const actions: Action[] = [];
            if (canMove({ player, tileLoc, renderable })) {
              actions.push({
                name: `Move (${player.movement.cost[hashLocation(tileLoc)]})`,
                type: "move",
                color: "green",
              });
            }
            const selected = hashLocation(selectedTile.location) === hashLocation(tileLoc);
            return (
              <div key={hashLocation(tileLoc)} className={`flex-item${selected ? ' ring-4 ring-inset' : ''}`}>
                <Tile
                  tileClass={""}
                  clickHandler={() => {
                    setSelectedTile({
                      player: player.name,
                      location: tileLoc,
                      type: "",
                      playerAtTile: null,
                      actions,
                    });
                  }}
                  revealed={
                    dm || player.revealed.has(hashLocation(tileLoc))
                  }
                  visible={player.visible.has(hashLocation(tileLoc))}
                  move={canMove({ player, tileLoc, renderable })}
                ></Tile>
              </div>
            );
          })}
      </div>
    ));
  doors.forEach((door) => {
    const specificDoors = door.getDoors();
    specificDoors.forEach((specificDoor) => {
      const tileLoc = specificDoor.location;
      const playerRange = calculateDistance(
        player.location,
        specificDoor.location
      );

      const actions: Action[] = [];
      if (door.open && canMove({ player, tileLoc, renderable })) {
        actions.push({
          name: "Move",
          type: "move",
          color: "green",
        });
      }
      if (door.open && playerRange <= 5) {
        actions.push({
          name: "Close Door",
          type: "close",
          color: "red",
        });
      }
      if (!door.open && !door.locked && playerRange <= 5) {
        actions.push({
          name: "Open Door",
          type: "open",
          color: "green",
        });
      }
      if (!door.open && door.locked && playerRange <= 5) {
        actions.push({
          name: "Unlock Door",
          type: "unlock",
          color: "yellow",
        });
      }
      board[specificDoor.location.y].props.children[specificDoor.location.x] = (
        <div key={hashLocation(specificDoor.location)} className="flex-item">
          <Tile
            door={tileTypes[specificDoor.doorClass].class || ""}
            lock={(tileTypes[specificDoor.lockClass] || {}).class || ""}
            tileClass={""}
            clickHandler={() => {
              setSelectedTile({
                player: player.name,
                location: specificDoor.location,
                type: "DOOR",
                playerAtTile: null,
                actions,
              });
            }}
            revealed={player.revealed.has(hashLocation(tileLoc))}
            visible={dm || player.visible.has(hashLocation(tileLoc))}
            move={canMove({ player, tileLoc, renderable })}
          ></Tile>
        </div>
      );
    });
    renderable.forEach((renderItem) => {
      const tileLoc = renderItem.location;
      board[renderItem.location.y].props.children[renderItem.location.x] = (
        <div key={hashLocation(renderItem.location)} className="flex-item">
          <Tile
            tileClass={renderItem.class}
            clickHandler={() => {
              setSelectedTile({
                player: player.name,
                location: renderItem.location,
                type: renderItem.name,
                playerAtTile: null,
                actions: renderItem.actions,
                description: renderItem.description,
              });
            }}
            revealed={player.revealed.has(hashLocation(tileLoc))}
            visible={dm || player.visible.has(hashLocation(tileLoc))}
            move={canMove({ player, tileLoc, renderable })}
          ></Tile>
        </div>
      );
    });
    board[player.location.y].props.children[player.location.x] = (
      <div key={hashLocation(player.location)} className="flex-item">
        <Tile
          tileClass={player.color}
          clickHandler={() => {
            setSelectedTile({
              player: player.name,
              location: player.location,
              type: "CHARACTER",
              playerAtTile: player.getStats(),
              actions: [],
            });
          }}
          revealed={true}
          visible={true}
          move={false}
        ></Tile>
      </div>
    );
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
