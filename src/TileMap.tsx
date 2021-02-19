import "./Board.css";

const sideLength = 16;

function TileMap() {
    const tileList: string[] = [];
  return (
    <div className="flex py-5">
      <div className="flex-1">
        {Array(sideLength)
          .fill("")
          .map((_row, y) => (
            <div className="flex-container bg-green-500">
              {Array(sideLength)
                .fill("")
                .map((_tile, x) => {
                    const proportion = (100 / (sideLength - 1))
                    const xProp = x * proportion;
                    const yProp = y * proportion;
                  tileList.push(
                    `.tile-${x}-${y} { background-position: ${
                      xProp.toFixed(2)
                    }% ${yProp.toFixed(2)}%; }`
                  );
                  return (
                    <div className="flex-item">
                      <div className="Tile">
                        <div
                          className={`tiles tile-snapshot tile-${x}-${y} text-xs text-white`}
                        >{`${x}-${y}`}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
      </div>
      <div className="flex-none w-full md:max-w-xs">
        <pre>{tileList.join("\n")}</pre>
      </div>
    </div>
  );
}

export default TileMap;
