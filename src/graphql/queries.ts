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
    active
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
      }
      nextToken
    }
    characters {
      items {
        id
        gameID
        name
        email
        color
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
      }
      nextToken
    }
    history {
      items {
        id
        gameID
        datetime
        character
        action
        location {
          x
          y
        }
      }
      nextToken
    }
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
      active
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
        }
        nextToken
      }
      characters {
        items {
          id
          gameID
          name
          email
          color
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
        }
        nextToken
      }
      history {
        items {
          id
          gameID
          datetime
          character
          action
          location {
            x
            y
          }
        }
        nextToken
      }
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
    }
    nextToken
  }
}
`;
export const getGameHistory = `query GetGameHistory($id: ID!) {
  getGameHistory(id: $id) {
    id
    gameID
    datetime
    character
    action
    location {
      x
      y
    }
  }
}
`;
export const listGameHistorys = `query ListGameHistorys(
  $filter: ModelGameHistoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      gameID
      datetime
      character
      action
      location {
        x
        y
      }
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
    email
    color
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
      email
      color
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
    }
    nextToken
  }
}
`;
