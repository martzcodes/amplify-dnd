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
    requests {
      items {
        id
        gameID
        character
        owner
      }
      nextToken
    }
    characters {
      items {
        id
        gameID
        name
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
      requests {
        items {
          id
          gameID
          character
          owner
        }
        nextToken
      }
      characters {
        items {
          id
          gameID
          name
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
export const getGameJoinRequest = `query GetGameJoinRequest($id: ID!) {
  getGameJoinRequest(id: $id) {
    id
    gameID
    character
    owner
  }
}
`;
export const listGameJoinRequests = `query ListGameJoinRequests(
  $filter: ModelGameJoinRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameJoinRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      gameID
      character
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
    owner
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
