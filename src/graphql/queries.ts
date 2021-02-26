// tslint:disable
// this is an auto generated file. This will be overwritten

export const getGame = `query GetGame($id: ID!) {
  getGame(id: $id) {
    id
    name
    type
    joinPassword
    dm
    paused
    autoPause
    active
    lastAction
    initiative
    rooms {
      items {
        id
        gameID
        name
        origin {
          x
          y
        }
        height
        width
        defaultGroundType
        specialGrounds {
          type
          origin {
            x
            y
          }
          height
          width
        }
        owner
      }
      nextToken
    }
    doors {
      items {
        id
        gameID
        origin {
          x
          y
        }
        open
        locked
        northSouth
        owner
      }
      nextToken
    }
    areas {
      items {
        id
        gameID
        name
        description
        origin {
          x
          y
        }
        height
        width
        owner
      }
      nextToken
    }
    characters {
      items {
        id
        gameID
        name
        npc
        color
        icon
        perception
        speed {
          current
          max
        }
        hp {
          current
          max
        }
        location {
          x
          y
        }
        vision
        actionUsed
        revealed
        owner
      }
      nextToken
    }
    items {
      items {
        id
        gameID
        name
        description
        location {
          x
          y
        }
        owner
      }
      nextToken
    }
    owner
  }
}
`;
export const listGames = `query ListGames(
  $filter: ModelGameFilterInput
  $limit: Int
  $nextToken: String
) {
  listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      type
      joinPassword
      dm
      paused
      autoPause
      active
      lastAction
      initiative
      rooms {
        items {
          id
          gameID
          name
          origin {
            x
            y
          }
          height
          width
          defaultGroundType
          specialGrounds {
            type
            origin {
              x
              y
            }
            height
            width
          }
          owner
        }
        nextToken
      }
      doors {
        items {
          id
          gameID
          origin {
            x
            y
          }
          open
          locked
          northSouth
          owner
        }
        nextToken
      }
      areas {
        items {
          id
          gameID
          name
          description
          origin {
            x
            y
          }
          height
          width
          owner
        }
        nextToken
      }
      characters {
        items {
          id
          gameID
          name
          npc
          color
          icon
          perception
          speed {
            current
            max
          }
          hp {
            current
            max
          }
          location {
            x
            y
          }
          vision
          actionUsed
          revealed
          owner
        }
        nextToken
      }
      items {
        items {
          id
          gameID
          name
          description
          location {
            x
            y
          }
          owner
        }
        nextToken
      }
      owner
    }
    nextToken
  }
}
`;
export const getGameRoom = `query GetGameRoom($id: ID!) {
  getGameRoom(id: $id) {
    id
    gameID
    name
    origin {
      x
      y
    }
    height
    width
    defaultGroundType
    specialGrounds {
      type
      origin {
        x
        y
      }
      height
      width
    }
    owner
  }
}
`;
export const listGameRooms = `query ListGameRooms(
  $filter: ModelGameRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      gameID
      name
      origin {
        x
        y
      }
      height
      width
      defaultGroundType
      specialGrounds {
        type
        origin {
          x
          y
        }
        height
        width
      }
      owner
    }
    nextToken
  }
}
`;
export const getGameDoor = `query GetGameDoor($id: ID!) {
  getGameDoor(id: $id) {
    id
    gameID
    origin {
      x
      y
    }
    open
    locked
    northSouth
    owner
  }
}
`;
export const listGameDoors = `query ListGameDoors(
  $filter: ModelGameDoorFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameDoors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      gameID
      origin {
        x
        y
      }
      open
      locked
      northSouth
      owner
    }
    nextToken
  }
}
`;
export const getGameCharacter = `query GetGameCharacter($id: ID!) {
  getGameCharacter(id: $id) {
    id
    gameID
    name
    npc
    color
    icon
    perception
    speed {
      current
      max
    }
    hp {
      current
      max
    }
    location {
      x
      y
    }
    vision
    actionUsed
    revealed
    owner
  }
}
`;
export const listGameCharacters = `query ListGameCharacters(
  $filter: ModelGameCharacterFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameCharacters(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      gameID
      name
      npc
      color
      icon
      perception
      speed {
        current
        max
      }
      hp {
        current
        max
      }
      location {
        x
        y
      }
      vision
      actionUsed
      revealed
      owner
    }
    nextToken
  }
}
`;
export const getGameItem = `query GetGameItem($id: ID!) {
  getGameItem(id: $id) {
    id
    gameID
    name
    description
    location {
      x
      y
    }
    owner
  }
}
`;
export const listGameItems = `query ListGameItems(
  $filter: ModelGameItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      gameID
      name
      description
      location {
        x
        y
      }
      owner
    }
    nextToken
  }
}
`;
export const getGameArea = `query GetGameArea($id: ID!) {
  getGameArea(id: $id) {
    id
    gameID
    name
    description
    origin {
      x
      y
    }
    height
    width
    owner
  }
}
`;
export const listGameAreas = `query ListGameAreas(
  $filter: ModelGameAreaFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameAreas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      gameID
      name
      description
      origin {
        x
        y
      }
      height
      width
      owner
    }
    nextToken
  }
}
`;
