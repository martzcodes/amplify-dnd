// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateGame = `subscription OnCreateGame {
  onCreateGame {
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
export const onUpdateGame = `subscription OnUpdateGame {
  onUpdateGame {
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
export const onDeleteGame = `subscription OnDeleteGame {
  onDeleteGame {
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
export const onCreateGameRoom = `subscription OnCreateGameRoom {
  onCreateGameRoom {
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
export const onUpdateGameRoom = `subscription OnUpdateGameRoom {
  onUpdateGameRoom {
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
export const onDeleteGameRoom = `subscription OnDeleteGameRoom {
  onDeleteGameRoom {
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
export const onCreateGameDoor = `subscription OnCreateGameDoor {
  onCreateGameDoor {
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
  }
}
`;
export const onDeleteGameDoor = `subscription OnDeleteGameDoor {
  onDeleteGameDoor {
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
export const onCreateGameHistory = `subscription OnCreateGameHistory {
  onCreateGameHistory {
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
export const onUpdateGameHistory = `subscription OnUpdateGameHistory {
  onUpdateGameHistory {
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
export const onDeleteGameHistory = `subscription OnDeleteGameHistory {
  onDeleteGameHistory {
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
export const onCreateGameCharacter = `subscription OnCreateGameCharacter {
  onCreateGameCharacter {
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
export const onUpdateGameCharacter = `subscription OnUpdateGameCharacter {
  onUpdateGameCharacter {
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
export const onDeleteGameCharacter = `subscription OnDeleteGameCharacter {
  onDeleteGameCharacter {
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
export const onCreateGameItem = `subscription OnCreateGameItem {
  onCreateGameItem {
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
export const onUpdateGameItem = `subscription OnUpdateGameItem {
  onUpdateGameItem {
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
export const onDeleteGameItem = `subscription OnDeleteGameItem {
  onDeleteGameItem {
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
export const onCreateGameArea = `subscription OnCreateGameArea {
  onCreateGameArea {
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
export const onUpdateGameArea = `subscription OnUpdateGameArea {
  onUpdateGameArea {
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
export const onDeleteGameArea = `subscription OnDeleteGameArea {
  onDeleteGameArea {
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
