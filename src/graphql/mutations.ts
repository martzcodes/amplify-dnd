// tslint:disable
// this is an auto generated file. This will be overwritten

export const createGame = `mutation CreateGame(
  $input: CreateGameInput!
  $condition: ModelGameConditionInput
) {
  createGame(input: $input, condition: $condition) {
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
export const updateGame = `mutation UpdateGame(
  $input: UpdateGameInput!
  $condition: ModelGameConditionInput
) {
  updateGame(input: $input, condition: $condition) {
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
export const deleteGame = `mutation DeleteGame(
  $input: DeleteGameInput!
  $condition: ModelGameConditionInput
) {
  deleteGame(input: $input, condition: $condition) {
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
export const createGameRoom = `mutation CreateGameRoom(
  $input: CreateGameRoomInput!
  $condition: ModelGameRoomConditionInput
) {
  createGameRoom(input: $input, condition: $condition) {
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
export const updateGameRoom = `mutation UpdateGameRoom(
  $input: UpdateGameRoomInput!
  $condition: ModelGameRoomConditionInput
) {
  updateGameRoom(input: $input, condition: $condition) {
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
export const deleteGameRoom = `mutation DeleteGameRoom(
  $input: DeleteGameRoomInput!
  $condition: ModelGameRoomConditionInput
) {
  deleteGameRoom(input: $input, condition: $condition) {
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
export const createGameDoor = `mutation CreateGameDoor(
  $input: CreateGameDoorInput!
  $condition: ModelGameDoorConditionInput
) {
  createGameDoor(input: $input, condition: $condition) {
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
export const updateGameDoor = `mutation UpdateGameDoor(
  $input: UpdateGameDoorInput!
  $condition: ModelGameDoorConditionInput
) {
  updateGameDoor(input: $input, condition: $condition) {
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
export const deleteGameDoor = `mutation DeleteGameDoor(
  $input: DeleteGameDoorInput!
  $condition: ModelGameDoorConditionInput
) {
  deleteGameDoor(input: $input, condition: $condition) {
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
export const createGameCharacter = `mutation CreateGameCharacter(
  $input: CreateGameCharacterInput!
  $condition: ModelGameCharacterConditionInput
) {
  createGameCharacter(input: $input, condition: $condition) {
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
export const updateGameCharacter = `mutation UpdateGameCharacter(
  $input: UpdateGameCharacterInput!
  $condition: ModelGameCharacterConditionInput
) {
  updateGameCharacter(input: $input, condition: $condition) {
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
export const deleteGameCharacter = `mutation DeleteGameCharacter(
  $input: DeleteGameCharacterInput!
  $condition: ModelGameCharacterConditionInput
) {
  deleteGameCharacter(input: $input, condition: $condition) {
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
export const createGameItem = `mutation CreateGameItem(
  $input: CreateGameItemInput!
  $condition: ModelGameItemConditionInput
) {
  createGameItem(input: $input, condition: $condition) {
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
export const updateGameItem = `mutation UpdateGameItem(
  $input: UpdateGameItemInput!
  $condition: ModelGameItemConditionInput
) {
  updateGameItem(input: $input, condition: $condition) {
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
export const deleteGameItem = `mutation DeleteGameItem(
  $input: DeleteGameItemInput!
  $condition: ModelGameItemConditionInput
) {
  deleteGameItem(input: $input, condition: $condition) {
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
export const createGameArea = `mutation CreateGameArea(
  $input: CreateGameAreaInput!
  $condition: ModelGameAreaConditionInput
) {
  createGameArea(input: $input, condition: $condition) {
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
export const updateGameArea = `mutation UpdateGameArea(
  $input: UpdateGameAreaInput!
  $condition: ModelGameAreaConditionInput
) {
  updateGameArea(input: $input, condition: $condition) {
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
export const deleteGameArea = `mutation DeleteGameArea(
  $input: DeleteGameAreaInput!
  $condition: ModelGameAreaConditionInput
) {
  deleteGameArea(input: $input, condition: $condition) {
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
