// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateGame = `subscription OnCreateGame($owner: String!) {
  onCreateGame(owner: $owner) {
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
export const onUpdateGame = `subscription OnUpdateGame($owner: String!) {
  onUpdateGame(owner: $owner) {
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
export const onDeleteGame = `subscription OnDeleteGame($owner: String!) {
  onDeleteGame(owner: $owner) {
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
export const onCreateGameRoom = `subscription OnCreateGameRoom($owner: String!) {
  onCreateGameRoom(owner: $owner) {
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
export const onUpdateGameRoom = `subscription OnUpdateGameRoom($owner: String!) {
  onUpdateGameRoom(owner: $owner) {
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
export const onDeleteGameRoom = `subscription OnDeleteGameRoom($owner: String!) {
  onDeleteGameRoom(owner: $owner) {
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
export const onCreateGameDoor = `subscription OnCreateGameDoor($owner: String!) {
  onCreateGameDoor(owner: $owner) {
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
export const onUpdateGameDoor = `subscription OnUpdateGameDoor($owner: String!) {
  onUpdateGameDoor(owner: $owner) {
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
export const onDeleteGameDoor = `subscription OnDeleteGameDoor($owner: String!) {
  onDeleteGameDoor(owner: $owner) {
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
export const onCreateGameHistory = `subscription OnCreateGameHistory($owner: String!) {
  onCreateGameHistory(owner: $owner) {
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
export const onUpdateGameHistory = `subscription OnUpdateGameHistory($owner: String!) {
  onUpdateGameHistory(owner: $owner) {
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
export const onDeleteGameHistory = `subscription OnDeleteGameHistory($owner: String!) {
  onDeleteGameHistory(owner: $owner) {
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
export const onCreateGameCharacter = `subscription OnCreateGameCharacter($owner: String!) {
  onCreateGameCharacter(owner: $owner) {
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
    owner
  }
}
`;
export const onUpdateGameCharacter = `subscription OnUpdateGameCharacter($owner: String!) {
  onUpdateGameCharacter(owner: $owner) {
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
    owner
  }
}
`;
export const onDeleteGameCharacter = `subscription OnDeleteGameCharacter($owner: String!) {
  onDeleteGameCharacter(owner: $owner) {
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
    owner
  }
}
`;
export const onCreateGameItem = `subscription OnCreateGameItem($owner: String!) {
  onCreateGameItem(owner: $owner) {
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
export const onUpdateGameItem = `subscription OnUpdateGameItem($owner: String!) {
  onUpdateGameItem(owner: $owner) {
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
export const onDeleteGameItem = `subscription OnDeleteGameItem($owner: String!) {
  onDeleteGameItem(owner: $owner) {
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
export const onCreateGameArea = `subscription OnCreateGameArea($owner: String!) {
  onCreateGameArea(owner: $owner) {
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
export const onUpdateGameArea = `subscription OnUpdateGameArea($owner: String!) {
  onUpdateGameArea(owner: $owner) {
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
export const onDeleteGameArea = `subscription OnDeleteGameArea($owner: String!) {
  onDeleteGameArea(owner: $owner) {
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
