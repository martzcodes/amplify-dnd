import "./Game.css";
import { Location } from "./models/Location";
import { hashLocation } from "./utils/hashLocation";
import { calculateDistance, Character } from "./Character";
import { Action } from "./models/Action";
import Tile, { tileTypes } from "./Tile";
import { Door } from "./Door";
import { Renderable } from "./UserLayer";

export interface Bounds {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

const canMove = ({
  character,
  tileLoc,
  renderable,
}: {
  character: Character;
  tileLoc: Location;
  renderable: Renderable[];
}): boolean => {
  if (character && character.movement.tiles.has(hashLocation(tileLoc))) {
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
  character,
  renderable,
  dm,
}: {
  selectedTile: { location: Location; actions: Action[] };
  setSelectedTile: any;
  width: number;
  height: number;
  doors: Door[];
  character: Character;
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
            if (canMove({ character, tileLoc, renderable })) {
              actions.push({
                name: `Move (${
                  character.movement.cost[hashLocation(tileLoc)]
                })`,
                type: "move",
                color: "green",
              });
            }
            const selected =
              hashLocation(selectedTile.location) === hashLocation(tileLoc);
            return (
              <div
                key={hashLocation(tileLoc)}
                className={`flex-item${selected ? " ring-4 ring-inset" : ""}`}
              >
                <Tile
                  tileClass={""}
                  clickHandler={() => {
                    setSelectedTile({
                      character: character.name,
                      location: tileLoc,
                      type: "",
                      characterAtTile: null,
                      actions,
                    });
                  }}
                  revealed={dm || character.revealed.has(hashLocation(tileLoc))}
                  visible={
                    character && character.visible.has(hashLocation(tileLoc))
                  }
                  move={canMove({ character, tileLoc, renderable })}
                ></Tile>
              </div>
            );
          })}
      </div>
    ));
  if (character) {
    doors.forEach((door) => {
      const specificDoors = door.getDoors();
      specificDoors.forEach((specificDoor) => {
        const tileLoc = specificDoor.location;
        const characterRange = calculateDistance(
          character.location,
          specificDoor.location
        );

        const actions: Action[] = [];
        if (door.open && canMove({ character, tileLoc, renderable })) {
          actions.push({
            name: "Move",
            type: "move",
            color: "green",
          });
        }
        if (door.open && characterRange <= 5) {
          actions.push({
            name: "Close Door",
            type: "close",
            color: "red",
          });
        }
        if (!door.open && !door.locked && characterRange <= 5) {
          actions.push({
            name: "Open Door",
            type: "open",
            color: "green",
          });
        }
        if (!door.open && door.locked && characterRange <= 5) {
          actions.push({
            name: "Unlock Door",
            type: "unlock",
            color: "yellow",
          });
        }
        board[specificDoor.location.y].props.children[
          specificDoor.location.x
        ] = (
          <div key={hashLocation(specificDoor.location)} className="flex-item">
            <Tile
              door={tileTypes[specificDoor.doorClass].class || ""}
              lock={(tileTypes[specificDoor.lockClass] || {}).class || ""}
              tileClass={""}
              clickHandler={() => {
                setSelectedTile({
                  character: character.name,
                  location: specificDoor.location,
                  type: "DOOR",
                  characterAtTile: null,
                  actions,
                });
              }}
              revealed={character.revealed.has(hashLocation(tileLoc))}
              visible={dm || character.visible.has(hashLocation(tileLoc))}
              move={canMove({ character, tileLoc, renderable })}
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
                  character: character.name,
                  location: renderItem.location,
                  type: renderItem.name,
                  characterAtTile: null,
                  actions: renderItem.actions,
                  description: renderItem.description,
                });
              }}
              revealed={character.revealed.has(hashLocation(tileLoc))}
              visible={dm || character.visible.has(hashLocation(tileLoc))}
              move={canMove({ character, tileLoc, renderable })}
            ></Tile>
          </div>
        );
      });
      board[character.location.y].props.children[character.location.x] = (
        <div key={hashLocation(character.location)} className="flex-item">
          <Tile
            tileClass={character.color}
            clickHandler={() => {
              setSelectedTile({
                character: character.name,
                location: character.location,
                type: "CHARACTER",
                characterAtTile: character.getStats(),
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
  }
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
  //       character: tracker.active,
  //       location: tileLoc,
  //       type: cell,
  //       characterAtTile: characterTileName
  //         ? tracker.characters[characterTileName].getStats()
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
