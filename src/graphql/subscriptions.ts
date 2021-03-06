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
    autoPause
    active
    lastAction
    initiative
    discordNotification
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
        hidden
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
        perception
        enabled
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
    owner
  }
}
`;
export const onUpdateGame = `subscription OnUpdateGame {
  onUpdateGame {
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
    discordNotification
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
        hidden
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
        perception
        enabled
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
    autoPause
    active
    lastAction
    initiative
    discordNotification
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
        hidden
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
        perception
        enabled
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
    hidden
    owner
  }
}
`;
export const onUpdateGameDoor = `subscription OnUpdateGameDoor {
  onUpdateGameDoor {
    id
    gameID
    origin {
      x
      y
    }
    open
    locked
    northSouth
    hidden
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
    hidden
    owner
  }
}
`;
export const onCreateGameCharacter = `subscription OnCreateGameCharacter($owner: String!) {
  onCreateGameCharacter(owner: $owner) {
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
export const onUpdateGameCharacter = `subscription OnUpdateGameCharacter {
  onUpdateGameCharacter {
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
export const onDeleteGameCharacter = `subscription OnDeleteGameCharacter($owner: String!) {
  onDeleteGameCharacter(owner: $owner) {
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
    perception
    enabled
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
    perception
    enabled
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
    perception
    enabled
    owner
  }
}
`;
