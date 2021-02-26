/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateGameInput = {
  id?: string | null,
  name: string,
  type: GameType,
  joinPassword?: string | null,
  dm: string,
  paused?: boolean | null,
  autoPause?: boolean | null,
  active?: string | null,
  lastAction?: string | null,
  initiative?: Array< string > | null,
};

export enum GameType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}


export type ModelGameConditionInput = {
  name?: ModelStringInput | null,
  type?: ModelGameTypeInput | null,
  joinPassword?: ModelStringInput | null,
  dm?: ModelStringInput | null,
  paused?: ModelBooleanInput | null,
  autoPause?: ModelBooleanInput | null,
  active?: ModelStringInput | null,
  lastAction?: ModelStringInput | null,
  initiative?: ModelStringInput | null,
  and?: Array< ModelGameConditionInput | null > | null,
  or?: Array< ModelGameConditionInput | null > | null,
  not?: ModelGameConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelGameTypeInput = {
  eq?: GameType | null,
  ne?: GameType | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum SpecialGroundType {
  LAVA = "LAVA",
  AQUA = "AQUA",
  VOID = "VOID",
}


export type UpdateGameInput = {
  id: string,
  name?: string | null,
  type?: GameType | null,
  joinPassword?: string | null,
  dm?: string | null,
  paused?: boolean | null,
  autoPause?: boolean | null,
  active?: string | null,
  lastAction?: string | null,
  initiative?: Array< string > | null,
};

export type DeleteGameInput = {
  id?: string | null,
};

export type CreateGameRoomInput = {
  id?: string | null,
  gameID: string,
  name: string,
  origin: LocationInput,
  height: number,
  width: number,
  defaultGroundType: string,
  specialGrounds: Array< GameRoomGroundInput >,
};

export type LocationInput = {
  x: number,
  y: number,
};

export type GameRoomGroundInput = {
  type: SpecialGroundType,
  origin: LocationInput,
  height: number,
  width: number,
};

export type ModelGameRoomConditionInput = {
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  defaultGroundType?: ModelStringInput | null,
  and?: Array< ModelGameRoomConditionInput | null > | null,
  or?: Array< ModelGameRoomConditionInput | null > | null,
  not?: ModelGameRoomConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateGameRoomInput = {
  id: string,
  gameID?: string | null,
  name?: string | null,
  origin?: LocationInput | null,
  height?: number | null,
  width?: number | null,
  defaultGroundType?: string | null,
  specialGrounds?: Array< GameRoomGroundInput > | null,
};

export type DeleteGameRoomInput = {
  id?: string | null,
};

export type CreateGameDoorInput = {
  id?: string | null,
  gameID: string,
  origin: LocationInput,
  open?: boolean | null,
  locked?: boolean | null,
  northSouth?: boolean | null,
};

export type ModelGameDoorConditionInput = {
  gameID?: ModelIDInput | null,
  open?: ModelBooleanInput | null,
  locked?: ModelBooleanInput | null,
  northSouth?: ModelBooleanInput | null,
  and?: Array< ModelGameDoorConditionInput | null > | null,
  or?: Array< ModelGameDoorConditionInput | null > | null,
  not?: ModelGameDoorConditionInput | null,
};

export type UpdateGameDoorInput = {
  id: string,
  gameID?: string | null,
  origin?: LocationInput | null,
  open?: boolean | null,
  locked?: boolean | null,
  northSouth?: boolean | null,
};

export type DeleteGameDoorInput = {
  id?: string | null,
};

export type CreateGameCharacterInput = {
  id?: string | null,
  gameID: string,
  name: string,
  npc?: boolean | null,
  color: string,
  icon?: string | null,
  perception: number,
  speed: CurrentMaxInput,
  hp: CurrentMaxInput,
  location: LocationInput,
  vision: number,
  actionUsed: boolean,
  revealed?: Array< string > | null,
};

export type CurrentMaxInput = {
  current: number,
  max: number,
};

export type ModelGameCharacterConditionInput = {
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  npc?: ModelBooleanInput | null,
  color?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  perception?: ModelIntInput | null,
  vision?: ModelIntInput | null,
  actionUsed?: ModelBooleanInput | null,
  revealed?: ModelStringInput | null,
  and?: Array< ModelGameCharacterConditionInput | null > | null,
  or?: Array< ModelGameCharacterConditionInput | null > | null,
  not?: ModelGameCharacterConditionInput | null,
};

export type UpdateGameCharacterInput = {
  id: string,
  gameID?: string | null,
  name?: string | null,
  npc?: boolean | null,
  color?: string | null,
  icon?: string | null,
  perception?: number | null,
  speed?: CurrentMaxInput | null,
  hp?: CurrentMaxInput | null,
  location?: LocationInput | null,
  vision?: number | null,
  actionUsed?: boolean | null,
  revealed?: Array< string > | null,
};

export type DeleteGameCharacterInput = {
  id?: string | null,
};

export type CreateGameItemInput = {
  id?: string | null,
  gameID: string,
  name: string,
  description?: string | null,
  location: LocationInput,
};

export type ModelGameItemConditionInput = {
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelGameItemConditionInput | null > | null,
  or?: Array< ModelGameItemConditionInput | null > | null,
  not?: ModelGameItemConditionInput | null,
};

export type UpdateGameItemInput = {
  id: string,
  gameID?: string | null,
  name?: string | null,
  description?: string | null,
  location?: LocationInput | null,
};

export type DeleteGameItemInput = {
  id?: string | null,
};

export type CreateGameAreaInput = {
  id?: string | null,
  gameID: string,
  name: string,
  description: string,
  origin: LocationInput,
  height: number,
  width: number,
};

export type ModelGameAreaConditionInput = {
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  and?: Array< ModelGameAreaConditionInput | null > | null,
  or?: Array< ModelGameAreaConditionInput | null > | null,
  not?: ModelGameAreaConditionInput | null,
};

export type UpdateGameAreaInput = {
  id: string,
  gameID?: string | null,
  name?: string | null,
  description?: string | null,
  origin?: LocationInput | null,
  height?: number | null,
  width?: number | null,
};

export type DeleteGameAreaInput = {
  id?: string | null,
};

export type ModelGameFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  type?: ModelGameTypeInput | null,
  joinPassword?: ModelStringInput | null,
  dm?: ModelStringInput | null,
  paused?: ModelBooleanInput | null,
  autoPause?: ModelBooleanInput | null,
  active?: ModelStringInput | null,
  lastAction?: ModelStringInput | null,
  initiative?: ModelStringInput | null,
  and?: Array< ModelGameFilterInput | null > | null,
  or?: Array< ModelGameFilterInput | null > | null,
  not?: ModelGameFilterInput | null,
};

export type ModelGameRoomFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  defaultGroundType?: ModelStringInput | null,
  and?: Array< ModelGameRoomFilterInput | null > | null,
  or?: Array< ModelGameRoomFilterInput | null > | null,
  not?: ModelGameRoomFilterInput | null,
};

export type ModelGameDoorFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  open?: ModelBooleanInput | null,
  locked?: ModelBooleanInput | null,
  northSouth?: ModelBooleanInput | null,
  and?: Array< ModelGameDoorFilterInput | null > | null,
  or?: Array< ModelGameDoorFilterInput | null > | null,
  not?: ModelGameDoorFilterInput | null,
};

export type ModelGameCharacterFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  npc?: ModelBooleanInput | null,
  color?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  perception?: ModelIntInput | null,
  vision?: ModelIntInput | null,
  actionUsed?: ModelBooleanInput | null,
  revealed?: ModelStringInput | null,
  and?: Array< ModelGameCharacterFilterInput | null > | null,
  or?: Array< ModelGameCharacterFilterInput | null > | null,
  not?: ModelGameCharacterFilterInput | null,
};

export type ModelGameItemFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelGameItemFilterInput | null > | null,
  or?: Array< ModelGameItemFilterInput | null > | null,
  not?: ModelGameItemFilterInput | null,
};

export type ModelGameAreaFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  and?: Array< ModelGameAreaFilterInput | null > | null,
  or?: Array< ModelGameAreaFilterInput | null > | null,
  not?: ModelGameAreaFilterInput | null,
};

export type CreateGameMutationVariables = {
  input: CreateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type CreateGameMutation = {
  createGame:  {
    __typename: "Game",
    id: string,
    name: string,
    type: GameType,
    joinPassword: string | null,
    dm: string,
    paused: boolean | null,
    autoPause: boolean | null,
    active: string | null,
    lastAction: string | null,
    initiative: Array< string > | null,
    rooms:  {
      __typename: "ModelGameRoomConnection",
      items:  Array< {
        __typename: "GameRoom",
        id: string,
        gameID: string,
        name: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        defaultGroundType: string,
        specialGrounds:  Array< {
          __typename: "GameRoomGround",
          type: SpecialGroundType,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          height: number,
          width: number,
        } >,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    doors:  {
      __typename: "ModelGameDoorConnection",
      items:  Array< {
        __typename: "GameDoor",
        id: string,
        gameID: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        open: boolean | null,
        locked: boolean | null,
        northSouth: boolean | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    areas:  {
      __typename: "ModelGameAreaConnection",
      items:  Array< {
        __typename: "GameArea",
        id: string,
        gameID: string,
        name: string,
        description: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    characters:  {
      __typename: "ModelGameCharacterConnection",
      items:  Array< {
        __typename: "GameCharacter",
        id: string,
        gameID: string,
        name: string,
        npc: boolean | null,
        color: string,
        icon: string | null,
        perception: number,
        speed:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        hp:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        vision: number,
        actionUsed: boolean,
        revealed: Array< string > | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    items:  {
      __typename: "ModelGameItemConnection",
      items:  Array< {
        __typename: "GameItem",
        id: string,
        gameID: string,
        name: string,
        description: string | null,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type UpdateGameMutationVariables = {
  input: UpdateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type UpdateGameMutation = {
  updateGame:  {
    __typename: "Game",
    id: string,
    name: string,
    type: GameType,
    joinPassword: string | null,
    dm: string,
    paused: boolean | null,
    autoPause: boolean | null,
    active: string | null,
    lastAction: string | null,
    initiative: Array< string > | null,
    rooms:  {
      __typename: "ModelGameRoomConnection",
      items:  Array< {
        __typename: "GameRoom",
        id: string,
        gameID: string,
        name: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        defaultGroundType: string,
        specialGrounds:  Array< {
          __typename: "GameRoomGround",
          type: SpecialGroundType,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          height: number,
          width: number,
        } >,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    doors:  {
      __typename: "ModelGameDoorConnection",
      items:  Array< {
        __typename: "GameDoor",
        id: string,
        gameID: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        open: boolean | null,
        locked: boolean | null,
        northSouth: boolean | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    areas:  {
      __typename: "ModelGameAreaConnection",
      items:  Array< {
        __typename: "GameArea",
        id: string,
        gameID: string,
        name: string,
        description: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    characters:  {
      __typename: "ModelGameCharacterConnection",
      items:  Array< {
        __typename: "GameCharacter",
        id: string,
        gameID: string,
        name: string,
        npc: boolean | null,
        color: string,
        icon: string | null,
        perception: number,
        speed:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        hp:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        vision: number,
        actionUsed: boolean,
        revealed: Array< string > | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    items:  {
      __typename: "ModelGameItemConnection",
      items:  Array< {
        __typename: "GameItem",
        id: string,
        gameID: string,
        name: string,
        description: string | null,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type DeleteGameMutationVariables = {
  input: DeleteGameInput,
  condition?: ModelGameConditionInput | null,
};

export type DeleteGameMutation = {
  deleteGame:  {
    __typename: "Game",
    id: string,
    name: string,
    type: GameType,
    joinPassword: string | null,
    dm: string,
    paused: boolean | null,
    autoPause: boolean | null,
    active: string | null,
    lastAction: string | null,
    initiative: Array< string > | null,
    rooms:  {
      __typename: "ModelGameRoomConnection",
      items:  Array< {
        __typename: "GameRoom",
        id: string,
        gameID: string,
        name: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        defaultGroundType: string,
        specialGrounds:  Array< {
          __typename: "GameRoomGround",
          type: SpecialGroundType,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          height: number,
          width: number,
        } >,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    doors:  {
      __typename: "ModelGameDoorConnection",
      items:  Array< {
        __typename: "GameDoor",
        id: string,
        gameID: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        open: boolean | null,
        locked: boolean | null,
        northSouth: boolean | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    areas:  {
      __typename: "ModelGameAreaConnection",
      items:  Array< {
        __typename: "GameArea",
        id: string,
        gameID: string,
        name: string,
        description: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    characters:  {
      __typename: "ModelGameCharacterConnection",
      items:  Array< {
        __typename: "GameCharacter",
        id: string,
        gameID: string,
        name: string,
        npc: boolean | null,
        color: string,
        icon: string | null,
        perception: number,
        speed:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        hp:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        vision: number,
        actionUsed: boolean,
        revealed: Array< string > | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    items:  {
      __typename: "ModelGameItemConnection",
      items:  Array< {
        __typename: "GameItem",
        id: string,
        gameID: string,
        name: string,
        description: string | null,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type CreateGameRoomMutationVariables = {
  input: CreateGameRoomInput,
  condition?: ModelGameRoomConditionInput | null,
};

export type CreateGameRoomMutation = {
  createGameRoom:  {
    __typename: "GameRoom",
    id: string,
    gameID: string,
    name: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    defaultGroundType: string,
    specialGrounds:  Array< {
      __typename: "GameRoomGround",
      type: SpecialGroundType,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      height: number,
      width: number,
    } >,
    owner: string | null,
  } | null,
};

export type UpdateGameRoomMutationVariables = {
  input: UpdateGameRoomInput,
  condition?: ModelGameRoomConditionInput | null,
};

export type UpdateGameRoomMutation = {
  updateGameRoom:  {
    __typename: "GameRoom",
    id: string,
    gameID: string,
    name: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    defaultGroundType: string,
    specialGrounds:  Array< {
      __typename: "GameRoomGround",
      type: SpecialGroundType,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      height: number,
      width: number,
    } >,
    owner: string | null,
  } | null,
};

export type DeleteGameRoomMutationVariables = {
  input: DeleteGameRoomInput,
  condition?: ModelGameRoomConditionInput | null,
};

export type DeleteGameRoomMutation = {
  deleteGameRoom:  {
    __typename: "GameRoom",
    id: string,
    gameID: string,
    name: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    defaultGroundType: string,
    specialGrounds:  Array< {
      __typename: "GameRoomGround",
      type: SpecialGroundType,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      height: number,
      width: number,
    } >,
    owner: string | null,
  } | null,
};

export type CreateGameDoorMutationVariables = {
  input: CreateGameDoorInput,
  condition?: ModelGameDoorConditionInput | null,
};

export type CreateGameDoorMutation = {
  createGameDoor:  {
    __typename: "GameDoor",
    id: string,
    gameID: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    open: boolean | null,
    locked: boolean | null,
    northSouth: boolean | null,
    owner: string | null,
  } | null,
};

export type UpdateGameDoorMutationVariables = {
  input: UpdateGameDoorInput,
  condition?: ModelGameDoorConditionInput | null,
};

export type UpdateGameDoorMutation = {
  updateGameDoor:  {
    __typename: "GameDoor",
    id: string,
    gameID: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    open: boolean | null,
    locked: boolean | null,
    northSouth: boolean | null,
    owner: string | null,
  } | null,
};

export type DeleteGameDoorMutationVariables = {
  input: DeleteGameDoorInput,
  condition?: ModelGameDoorConditionInput | null,
};

export type DeleteGameDoorMutation = {
  deleteGameDoor:  {
    __typename: "GameDoor",
    id: string,
    gameID: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    open: boolean | null,
    locked: boolean | null,
    northSouth: boolean | null,
    owner: string | null,
  } | null,
};

export type CreateGameCharacterMutationVariables = {
  input: CreateGameCharacterInput,
  condition?: ModelGameCharacterConditionInput | null,
};

export type CreateGameCharacterMutation = {
  createGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    npc: boolean | null,
    color: string,
    icon: string | null,
    perception: number,
    speed:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    hp:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    vision: number,
    actionUsed: boolean,
    revealed: Array< string > | null,
    owner: string | null,
  } | null,
};

export type UpdateGameCharacterMutationVariables = {
  input: UpdateGameCharacterInput,
  condition?: ModelGameCharacterConditionInput | null,
};

export type UpdateGameCharacterMutation = {
  updateGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    npc: boolean | null,
    color: string,
    icon: string | null,
    perception: number,
    speed:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    hp:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    vision: number,
    actionUsed: boolean,
    revealed: Array< string > | null,
    owner: string | null,
  } | null,
};

export type DeleteGameCharacterMutationVariables = {
  input: DeleteGameCharacterInput,
  condition?: ModelGameCharacterConditionInput | null,
};

export type DeleteGameCharacterMutation = {
  deleteGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    npc: boolean | null,
    color: string,
    icon: string | null,
    perception: number,
    speed:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    hp:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    vision: number,
    actionUsed: boolean,
    revealed: Array< string > | null,
    owner: string | null,
  } | null,
};

export type CreateGameItemMutationVariables = {
  input: CreateGameItemInput,
  condition?: ModelGameItemConditionInput | null,
};

export type CreateGameItemMutation = {
  createGameItem:  {
    __typename: "GameItem",
    id: string,
    gameID: string,
    name: string,
    description: string | null,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    owner: string | null,
  } | null,
};

export type UpdateGameItemMutationVariables = {
  input: UpdateGameItemInput,
  condition?: ModelGameItemConditionInput | null,
};

export type UpdateGameItemMutation = {
  updateGameItem:  {
    __typename: "GameItem",
    id: string,
    gameID: string,
    name: string,
    description: string | null,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    owner: string | null,
  } | null,
};

export type DeleteGameItemMutationVariables = {
  input: DeleteGameItemInput,
  condition?: ModelGameItemConditionInput | null,
};

export type DeleteGameItemMutation = {
  deleteGameItem:  {
    __typename: "GameItem",
    id: string,
    gameID: string,
    name: string,
    description: string | null,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    owner: string | null,
  } | null,
};

export type CreateGameAreaMutationVariables = {
  input: CreateGameAreaInput,
  condition?: ModelGameAreaConditionInput | null,
};

export type CreateGameAreaMutation = {
  createGameArea:  {
    __typename: "GameArea",
    id: string,
    gameID: string,
    name: string,
    description: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    owner: string | null,
  } | null,
};

export type UpdateGameAreaMutationVariables = {
  input: UpdateGameAreaInput,
  condition?: ModelGameAreaConditionInput | null,
};

export type UpdateGameAreaMutation = {
  updateGameArea:  {
    __typename: "GameArea",
    id: string,
    gameID: string,
    name: string,
    description: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    owner: string | null,
  } | null,
};

export type DeleteGameAreaMutationVariables = {
  input: DeleteGameAreaInput,
  condition?: ModelGameAreaConditionInput | null,
};

export type DeleteGameAreaMutation = {
  deleteGameArea:  {
    __typename: "GameArea",
    id: string,
    gameID: string,
    name: string,
    description: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    owner: string | null,
  } | null,
};

export type GetGameQueryVariables = {
  id: string,
};

export type GetGameQuery = {
  getGame:  {
    __typename: "Game",
    id: string,
    name: string,
    type: GameType,
    joinPassword: string | null,
    dm: string,
    paused: boolean | null,
    autoPause: boolean | null,
    active: string | null,
    lastAction: string | null,
    initiative: Array< string > | null,
    rooms:  {
      __typename: "ModelGameRoomConnection",
      items:  Array< {
        __typename: "GameRoom",
        id: string,
        gameID: string,
        name: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        defaultGroundType: string,
        specialGrounds:  Array< {
          __typename: "GameRoomGround",
          type: SpecialGroundType,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          height: number,
          width: number,
        } >,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    doors:  {
      __typename: "ModelGameDoorConnection",
      items:  Array< {
        __typename: "GameDoor",
        id: string,
        gameID: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        open: boolean | null,
        locked: boolean | null,
        northSouth: boolean | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    areas:  {
      __typename: "ModelGameAreaConnection",
      items:  Array< {
        __typename: "GameArea",
        id: string,
        gameID: string,
        name: string,
        description: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    characters:  {
      __typename: "ModelGameCharacterConnection",
      items:  Array< {
        __typename: "GameCharacter",
        id: string,
        gameID: string,
        name: string,
        npc: boolean | null,
        color: string,
        icon: string | null,
        perception: number,
        speed:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        hp:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        vision: number,
        actionUsed: boolean,
        revealed: Array< string > | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    items:  {
      __typename: "ModelGameItemConnection",
      items:  Array< {
        __typename: "GameItem",
        id: string,
        gameID: string,
        name: string,
        description: string | null,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type ListGamesQueryVariables = {
  filter?: ModelGameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGamesQuery = {
  listGames:  {
    __typename: "ModelGameConnection",
    items:  Array< {
      __typename: "Game",
      id: string,
      name: string,
      type: GameType,
      joinPassword: string | null,
      dm: string,
      paused: boolean | null,
      autoPause: boolean | null,
      active: string | null,
      lastAction: string | null,
      initiative: Array< string > | null,
      rooms:  {
        __typename: "ModelGameRoomConnection",
        items:  Array< {
          __typename: "GameRoom",
          id: string,
          gameID: string,
          name: string,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          height: number,
          width: number,
          defaultGroundType: string,
          specialGrounds:  Array< {
            __typename: "GameRoomGround",
            type: SpecialGroundType,
            origin:  {
              __typename: "Location",
              x: number,
              y: number,
            },
            height: number,
            width: number,
          } >,
          owner: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      doors:  {
        __typename: "ModelGameDoorConnection",
        items:  Array< {
          __typename: "GameDoor",
          id: string,
          gameID: string,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          open: boolean | null,
          locked: boolean | null,
          northSouth: boolean | null,
          owner: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      areas:  {
        __typename: "ModelGameAreaConnection",
        items:  Array< {
          __typename: "GameArea",
          id: string,
          gameID: string,
          name: string,
          description: string,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          height: number,
          width: number,
          owner: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      characters:  {
        __typename: "ModelGameCharacterConnection",
        items:  Array< {
          __typename: "GameCharacter",
          id: string,
          gameID: string,
          name: string,
          npc: boolean | null,
          color: string,
          icon: string | null,
          perception: number,
          speed:  {
            __typename: "CurrentMax",
            current: number,
            max: number,
          },
          hp:  {
            __typename: "CurrentMax",
            current: number,
            max: number,
          },
          location:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          vision: number,
          actionUsed: boolean,
          revealed: Array< string > | null,
          owner: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      items:  {
        __typename: "ModelGameItemConnection",
        items:  Array< {
          __typename: "GameItem",
          id: string,
          gameID: string,
          name: string,
          description: string | null,
          location:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          owner: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGameRoomQueryVariables = {
  id: string,
};

export type GetGameRoomQuery = {
  getGameRoom:  {
    __typename: "GameRoom",
    id: string,
    gameID: string,
    name: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    defaultGroundType: string,
    specialGrounds:  Array< {
      __typename: "GameRoomGround",
      type: SpecialGroundType,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      height: number,
      width: number,
    } >,
    owner: string | null,
  } | null,
};

export type ListGameRoomsQueryVariables = {
  filter?: ModelGameRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameRoomsQuery = {
  listGameRooms:  {
    __typename: "ModelGameRoomConnection",
    items:  Array< {
      __typename: "GameRoom",
      id: string,
      gameID: string,
      name: string,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      height: number,
      width: number,
      defaultGroundType: string,
      specialGrounds:  Array< {
        __typename: "GameRoomGround",
        type: SpecialGroundType,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
      } >,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGameDoorQueryVariables = {
  id: string,
};

export type GetGameDoorQuery = {
  getGameDoor:  {
    __typename: "GameDoor",
    id: string,
    gameID: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    open: boolean | null,
    locked: boolean | null,
    northSouth: boolean | null,
    owner: string | null,
  } | null,
};

export type ListGameDoorsQueryVariables = {
  filter?: ModelGameDoorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameDoorsQuery = {
  listGameDoors:  {
    __typename: "ModelGameDoorConnection",
    items:  Array< {
      __typename: "GameDoor",
      id: string,
      gameID: string,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      open: boolean | null,
      locked: boolean | null,
      northSouth: boolean | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGameCharacterQueryVariables = {
  id: string,
};

export type GetGameCharacterQuery = {
  getGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    npc: boolean | null,
    color: string,
    icon: string | null,
    perception: number,
    speed:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    hp:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    vision: number,
    actionUsed: boolean,
    revealed: Array< string > | null,
    owner: string | null,
  } | null,
};

export type ListGameCharactersQueryVariables = {
  filter?: ModelGameCharacterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameCharactersQuery = {
  listGameCharacters:  {
    __typename: "ModelGameCharacterConnection",
    items:  Array< {
      __typename: "GameCharacter",
      id: string,
      gameID: string,
      name: string,
      npc: boolean | null,
      color: string,
      icon: string | null,
      perception: number,
      speed:  {
        __typename: "CurrentMax",
        current: number,
        max: number,
      },
      hp:  {
        __typename: "CurrentMax",
        current: number,
        max: number,
      },
      location:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      vision: number,
      actionUsed: boolean,
      revealed: Array< string > | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGameItemQueryVariables = {
  id: string,
};

export type GetGameItemQuery = {
  getGameItem:  {
    __typename: "GameItem",
    id: string,
    gameID: string,
    name: string,
    description: string | null,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    owner: string | null,
  } | null,
};

export type ListGameItemsQueryVariables = {
  filter?: ModelGameItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameItemsQuery = {
  listGameItems:  {
    __typename: "ModelGameItemConnection",
    items:  Array< {
      __typename: "GameItem",
      id: string,
      gameID: string,
      name: string,
      description: string | null,
      location:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGameAreaQueryVariables = {
  id: string,
};

export type GetGameAreaQuery = {
  getGameArea:  {
    __typename: "GameArea",
    id: string,
    gameID: string,
    name: string,
    description: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    owner: string | null,
  } | null,
};

export type ListGameAreasQueryVariables = {
  filter?: ModelGameAreaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameAreasQuery = {
  listGameAreas:  {
    __typename: "ModelGameAreaConnection",
    items:  Array< {
      __typename: "GameArea",
      id: string,
      gameID: string,
      name: string,
      description: string,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      height: number,
      width: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateGameSubscriptionVariables = {
  owner: string,
};

export type OnCreateGameSubscription = {
  onCreateGame:  {
    __typename: "Game",
    id: string,
    name: string,
    type: GameType,
    joinPassword: string | null,
    dm: string,
    paused: boolean | null,
    autoPause: boolean | null,
    active: string | null,
    lastAction: string | null,
    initiative: Array< string > | null,
    rooms:  {
      __typename: "ModelGameRoomConnection",
      items:  Array< {
        __typename: "GameRoom",
        id: string,
        gameID: string,
        name: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        defaultGroundType: string,
        specialGrounds:  Array< {
          __typename: "GameRoomGround",
          type: SpecialGroundType,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          height: number,
          width: number,
        } >,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    doors:  {
      __typename: "ModelGameDoorConnection",
      items:  Array< {
        __typename: "GameDoor",
        id: string,
        gameID: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        open: boolean | null,
        locked: boolean | null,
        northSouth: boolean | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    areas:  {
      __typename: "ModelGameAreaConnection",
      items:  Array< {
        __typename: "GameArea",
        id: string,
        gameID: string,
        name: string,
        description: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    characters:  {
      __typename: "ModelGameCharacterConnection",
      items:  Array< {
        __typename: "GameCharacter",
        id: string,
        gameID: string,
        name: string,
        npc: boolean | null,
        color: string,
        icon: string | null,
        perception: number,
        speed:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        hp:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        vision: number,
        actionUsed: boolean,
        revealed: Array< string > | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    items:  {
      __typename: "ModelGameItemConnection",
      items:  Array< {
        __typename: "GameItem",
        id: string,
        gameID: string,
        name: string,
        description: string | null,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnUpdateGameSubscription = {
  onUpdateGame:  {
    __typename: "Game",
    id: string,
    name: string,
    type: GameType,
    joinPassword: string | null,
    dm: string,
    paused: boolean | null,
    autoPause: boolean | null,
    active: string | null,
    lastAction: string | null,
    initiative: Array< string > | null,
    rooms:  {
      __typename: "ModelGameRoomConnection",
      items:  Array< {
        __typename: "GameRoom",
        id: string,
        gameID: string,
        name: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        defaultGroundType: string,
        specialGrounds:  Array< {
          __typename: "GameRoomGround",
          type: SpecialGroundType,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          height: number,
          width: number,
        } >,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    doors:  {
      __typename: "ModelGameDoorConnection",
      items:  Array< {
        __typename: "GameDoor",
        id: string,
        gameID: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        open: boolean | null,
        locked: boolean | null,
        northSouth: boolean | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    areas:  {
      __typename: "ModelGameAreaConnection",
      items:  Array< {
        __typename: "GameArea",
        id: string,
        gameID: string,
        name: string,
        description: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    characters:  {
      __typename: "ModelGameCharacterConnection",
      items:  Array< {
        __typename: "GameCharacter",
        id: string,
        gameID: string,
        name: string,
        npc: boolean | null,
        color: string,
        icon: string | null,
        perception: number,
        speed:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        hp:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        vision: number,
        actionUsed: boolean,
        revealed: Array< string > | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    items:  {
      __typename: "ModelGameItemConnection",
      items:  Array< {
        __typename: "GameItem",
        id: string,
        gameID: string,
        name: string,
        description: string | null,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnDeleteGameSubscriptionVariables = {
  owner: string,
};

export type OnDeleteGameSubscription = {
  onDeleteGame:  {
    __typename: "Game",
    id: string,
    name: string,
    type: GameType,
    joinPassword: string | null,
    dm: string,
    paused: boolean | null,
    autoPause: boolean | null,
    active: string | null,
    lastAction: string | null,
    initiative: Array< string > | null,
    rooms:  {
      __typename: "ModelGameRoomConnection",
      items:  Array< {
        __typename: "GameRoom",
        id: string,
        gameID: string,
        name: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        defaultGroundType: string,
        specialGrounds:  Array< {
          __typename: "GameRoomGround",
          type: SpecialGroundType,
          origin:  {
            __typename: "Location",
            x: number,
            y: number,
          },
          height: number,
          width: number,
        } >,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    doors:  {
      __typename: "ModelGameDoorConnection",
      items:  Array< {
        __typename: "GameDoor",
        id: string,
        gameID: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        open: boolean | null,
        locked: boolean | null,
        northSouth: boolean | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    areas:  {
      __typename: "ModelGameAreaConnection",
      items:  Array< {
        __typename: "GameArea",
        id: string,
        gameID: string,
        name: string,
        description: string,
        origin:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        height: number,
        width: number,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    characters:  {
      __typename: "ModelGameCharacterConnection",
      items:  Array< {
        __typename: "GameCharacter",
        id: string,
        gameID: string,
        name: string,
        npc: boolean | null,
        color: string,
        icon: string | null,
        perception: number,
        speed:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        hp:  {
          __typename: "CurrentMax",
          current: number,
          max: number,
        },
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        vision: number,
        actionUsed: boolean,
        revealed: Array< string > | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    items:  {
      __typename: "ModelGameItemConnection",
      items:  Array< {
        __typename: "GameItem",
        id: string,
        gameID: string,
        name: string,
        description: string | null,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnCreateGameRoomSubscriptionVariables = {
  owner: string,
};

export type OnCreateGameRoomSubscription = {
  onCreateGameRoom:  {
    __typename: "GameRoom",
    id: string,
    gameID: string,
    name: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    defaultGroundType: string,
    specialGrounds:  Array< {
      __typename: "GameRoomGround",
      type: SpecialGroundType,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      height: number,
      width: number,
    } >,
    owner: string | null,
  } | null,
};

export type OnUpdateGameRoomSubscriptionVariables = {
  owner: string,
};

export type OnUpdateGameRoomSubscription = {
  onUpdateGameRoom:  {
    __typename: "GameRoom",
    id: string,
    gameID: string,
    name: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    defaultGroundType: string,
    specialGrounds:  Array< {
      __typename: "GameRoomGround",
      type: SpecialGroundType,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      height: number,
      width: number,
    } >,
    owner: string | null,
  } | null,
};

export type OnDeleteGameRoomSubscriptionVariables = {
  owner: string,
};

export type OnDeleteGameRoomSubscription = {
  onDeleteGameRoom:  {
    __typename: "GameRoom",
    id: string,
    gameID: string,
    name: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    defaultGroundType: string,
    specialGrounds:  Array< {
      __typename: "GameRoomGround",
      type: SpecialGroundType,
      origin:  {
        __typename: "Location",
        x: number,
        y: number,
      },
      height: number,
      width: number,
    } >,
    owner: string | null,
  } | null,
};

export type OnCreateGameDoorSubscriptionVariables = {
  owner: string,
};

export type OnCreateGameDoorSubscription = {
  onCreateGameDoor:  {
    __typename: "GameDoor",
    id: string,
    gameID: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    open: boolean | null,
    locked: boolean | null,
    northSouth: boolean | null,
    owner: string | null,
  } | null,
};

export type OnUpdateGameDoorSubscription = {
  onUpdateGameDoor:  {
    __typename: "GameDoor",
    id: string,
    gameID: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    open: boolean | null,
    locked: boolean | null,
    northSouth: boolean | null,
    owner: string | null,
  } | null,
};

export type OnDeleteGameDoorSubscriptionVariables = {
  owner: string,
};

export type OnDeleteGameDoorSubscription = {
  onDeleteGameDoor:  {
    __typename: "GameDoor",
    id: string,
    gameID: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    open: boolean | null,
    locked: boolean | null,
    northSouth: boolean | null,
    owner: string | null,
  } | null,
};

export type OnCreateGameCharacterSubscriptionVariables = {
  owner: string,
};

export type OnCreateGameCharacterSubscription = {
  onCreateGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    npc: boolean | null,
    color: string,
    icon: string | null,
    perception: number,
    speed:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    hp:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    vision: number,
    actionUsed: boolean,
    revealed: Array< string > | null,
    owner: string | null,
  } | null,
};

export type OnUpdateGameCharacterSubscription = {
  onUpdateGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    npc: boolean | null,
    color: string,
    icon: string | null,
    perception: number,
    speed:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    hp:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    vision: number,
    actionUsed: boolean,
    revealed: Array< string > | null,
    owner: string | null,
  } | null,
};

export type OnDeleteGameCharacterSubscriptionVariables = {
  owner: string,
};

export type OnDeleteGameCharacterSubscription = {
  onDeleteGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    npc: boolean | null,
    color: string,
    icon: string | null,
    perception: number,
    speed:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    hp:  {
      __typename: "CurrentMax",
      current: number,
      max: number,
    },
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    vision: number,
    actionUsed: boolean,
    revealed: Array< string > | null,
    owner: string | null,
  } | null,
};

export type OnCreateGameItemSubscriptionVariables = {
  owner: string,
};

export type OnCreateGameItemSubscription = {
  onCreateGameItem:  {
    __typename: "GameItem",
    id: string,
    gameID: string,
    name: string,
    description: string | null,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    owner: string | null,
  } | null,
};

export type OnUpdateGameItemSubscription = {
  onUpdateGameItem:  {
    __typename: "GameItem",
    id: string,
    gameID: string,
    name: string,
    description: string | null,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    owner: string | null,
  } | null,
};

export type OnDeleteGameItemSubscriptionVariables = {
  owner: string,
};

export type OnDeleteGameItemSubscription = {
  onDeleteGameItem:  {
    __typename: "GameItem",
    id: string,
    gameID: string,
    name: string,
    description: string | null,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    owner: string | null,
  } | null,
};

export type OnCreateGameAreaSubscriptionVariables = {
  owner: string,
};

export type OnCreateGameAreaSubscription = {
  onCreateGameArea:  {
    __typename: "GameArea",
    id: string,
    gameID: string,
    name: string,
    description: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    owner: string | null,
  } | null,
};

export type OnUpdateGameAreaSubscriptionVariables = {
  owner: string,
};

export type OnUpdateGameAreaSubscription = {
  onUpdateGameArea:  {
    __typename: "GameArea",
    id: string,
    gameID: string,
    name: string,
    description: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    owner: string | null,
  } | null,
};

export type OnDeleteGameAreaSubscriptionVariables = {
  owner: string,
};

export type OnDeleteGameAreaSubscription = {
  onDeleteGameArea:  {
    __typename: "GameArea",
    id: string,
    gameID: string,
    name: string,
    description: string,
    origin:  {
      __typename: "Location",
      x: number,
      y: number,
    },
    height: number,
    width: number,
    owner: string | null,
  } | null,
};
