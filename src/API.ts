/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateGameInput = {
  id?: string | null,
  name: string,
  type: GameType,
  joinPassword?: string | null,
  dm: string,
  paused?: boolean | null,
  active?: string | null,
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
  active?: ModelStringInput | null,
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
  active?: string | null,
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

export type CreateGameHistoryInput = {
  id?: string | null,
  gameID: string,
  datetime: string,
  character: string,
  action: string,
  location: LocationInput,
};

export type ModelGameHistoryConditionInput = {
  gameID?: ModelIDInput | null,
  datetime?: ModelStringInput | null,
  character?: ModelStringInput | null,
  action?: ModelStringInput | null,
  and?: Array< ModelGameHistoryConditionInput | null > | null,
  or?: Array< ModelGameHistoryConditionInput | null > | null,
  not?: ModelGameHistoryConditionInput | null,
};

export type UpdateGameHistoryInput = {
  id: string,
  gameID?: string | null,
  datetime?: string | null,
  character?: string | null,
  action?: string | null,
  location?: LocationInput | null,
};

export type DeleteGameHistoryInput = {
  id?: string | null,
};

export type CreateGameCharacterInput = {
  id?: string | null,
  gameID: string,
  name: string,
  email: string,
  color: string,
  perception: number,
  speed: CurrentMaxInput,
  hp: CurrentMaxInput,
  location: LocationInput,
  vision: number,
  actionUsed: boolean,
};

export type CurrentMaxInput = {
  current: number,
  max: number,
};

export type ModelGameCharacterConditionInput = {
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  color?: ModelStringInput | null,
  perception?: ModelIntInput | null,
  vision?: ModelIntInput | null,
  actionUsed?: ModelBooleanInput | null,
  and?: Array< ModelGameCharacterConditionInput | null > | null,
  or?: Array< ModelGameCharacterConditionInput | null > | null,
  not?: ModelGameCharacterConditionInput | null,
};

export type UpdateGameCharacterInput = {
  id: string,
  gameID?: string | null,
  name?: string | null,
  email?: string | null,
  color?: string | null,
  perception?: number | null,
  speed?: CurrentMaxInput | null,
  hp?: CurrentMaxInput | null,
  location?: LocationInput | null,
  vision?: number | null,
  actionUsed?: boolean | null,
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
  active?: ModelStringInput | null,
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

export type ModelGameHistoryFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  datetime?: ModelStringInput | null,
  character?: ModelStringInput | null,
  action?: ModelStringInput | null,
  and?: Array< ModelGameHistoryFilterInput | null > | null,
  or?: Array< ModelGameHistoryFilterInput | null > | null,
  not?: ModelGameHistoryFilterInput | null,
};

export type ModelGameCharacterFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  color?: ModelStringInput | null,
  perception?: ModelIntInput | null,
  vision?: ModelIntInput | null,
  actionUsed?: ModelBooleanInput | null,
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
    active: string | null,
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
        email: string,
        color: string,
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
      } | null > | null,
      nextToken: string | null,
    } | null,
    history:  {
      __typename: "ModelGameHistoryConnection",
      items:  Array< {
        __typename: "GameHistory",
        id: string,
        gameID: string,
        datetime: string,
        character: string,
        action: string,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    active: string | null,
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
        email: string,
        color: string,
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
      } | null > | null,
      nextToken: string | null,
    } | null,
    history:  {
      __typename: "ModelGameHistoryConnection",
      items:  Array< {
        __typename: "GameHistory",
        id: string,
        gameID: string,
        datetime: string,
        character: string,
        action: string,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    active: string | null,
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
        email: string,
        color: string,
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
      } | null > | null,
      nextToken: string | null,
    } | null,
    history:  {
      __typename: "ModelGameHistoryConnection",
      items:  Array< {
        __typename: "GameHistory",
        id: string,
        gameID: string,
        datetime: string,
        character: string,
        action: string,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
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
  } | null,
};

export type CreateGameHistoryMutationVariables = {
  input: CreateGameHistoryInput,
  condition?: ModelGameHistoryConditionInput | null,
};

export type CreateGameHistoryMutation = {
  createGameHistory:  {
    __typename: "GameHistory",
    id: string,
    gameID: string,
    datetime: string,
    character: string,
    action: string,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
  } | null,
};

export type UpdateGameHistoryMutationVariables = {
  input: UpdateGameHistoryInput,
  condition?: ModelGameHistoryConditionInput | null,
};

export type UpdateGameHistoryMutation = {
  updateGameHistory:  {
    __typename: "GameHistory",
    id: string,
    gameID: string,
    datetime: string,
    character: string,
    action: string,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
  } | null,
};

export type DeleteGameHistoryMutationVariables = {
  input: DeleteGameHistoryInput,
  condition?: ModelGameHistoryConditionInput | null,
};

export type DeleteGameHistoryMutation = {
  deleteGameHistory:  {
    __typename: "GameHistory",
    id: string,
    gameID: string,
    datetime: string,
    character: string,
    action: string,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
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
    email: string,
    color: string,
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
    email: string,
    color: string,
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
    email: string,
    color: string,
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
    active: string | null,
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
        email: string,
        color: string,
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
      } | null > | null,
      nextToken: string | null,
    } | null,
    history:  {
      __typename: "ModelGameHistoryConnection",
      items:  Array< {
        __typename: "GameHistory",
        id: string,
        gameID: string,
        datetime: string,
        character: string,
        action: string,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
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
      active: string | null,
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
          email: string,
          color: string,
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
        } | null > | null,
        nextToken: string | null,
      } | null,
      history:  {
        __typename: "ModelGameHistoryConnection",
        items:  Array< {
          __typename: "GameHistory",
          id: string,
          gameID: string,
          datetime: string,
          character: string,
          action: string,
          location:  {
            __typename: "Location",
            x: number,
            y: number,
          },
        } | null > | null,
        nextToken: string | null,
      } | null,
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
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGameHistoryQueryVariables = {
  id: string,
};

export type GetGameHistoryQuery = {
  getGameHistory:  {
    __typename: "GameHistory",
    id: string,
    gameID: string,
    datetime: string,
    character: string,
    action: string,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
  } | null,
};

export type ListGameHistorysQueryVariables = {
  filter?: ModelGameHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameHistorysQuery = {
  listGameHistorys:  {
    __typename: "ModelGameHistoryConnection",
    items:  Array< {
      __typename: "GameHistory",
      id: string,
      gameID: string,
      datetime: string,
      character: string,
      action: string,
      location:  {
        __typename: "Location",
        x: number,
        y: number,
      },
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
    email: string,
    color: string,
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
      email: string,
      color: string,
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
    } | null > | null,
    nextToken: string | null,
  } | null,
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
    active: string | null,
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
        email: string,
        color: string,
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
      } | null > | null,
      nextToken: string | null,
    } | null,
    history:  {
      __typename: "ModelGameHistoryConnection",
      items:  Array< {
        __typename: "GameHistory",
        id: string,
        gameID: string,
        datetime: string,
        character: string,
        action: string,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    active: string | null,
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
        email: string,
        color: string,
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
      } | null > | null,
      nextToken: string | null,
    } | null,
    history:  {
      __typename: "ModelGameHistoryConnection",
      items:  Array< {
        __typename: "GameHistory",
        id: string,
        gameID: string,
        datetime: string,
        character: string,
        action: string,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
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
    active: string | null,
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
        email: string,
        color: string,
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
      } | null > | null,
      nextToken: string | null,
    } | null,
    history:  {
      __typename: "ModelGameHistoryConnection",
      items:  Array< {
        __typename: "GameHistory",
        id: string,
        gameID: string,
        datetime: string,
        character: string,
        action: string,
        location:  {
          __typename: "Location",
          x: number,
          y: number,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
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
  } | null,
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
  } | null,
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
  } | null,
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
  } | null,
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
  } | null,
};

export type OnCreateGameHistorySubscription = {
  onCreateGameHistory:  {
    __typename: "GameHistory",
    id: string,
    gameID: string,
    datetime: string,
    character: string,
    action: string,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
  } | null,
};

export type OnUpdateGameHistorySubscription = {
  onUpdateGameHistory:  {
    __typename: "GameHistory",
    id: string,
    gameID: string,
    datetime: string,
    character: string,
    action: string,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
  } | null,
};

export type OnDeleteGameHistorySubscription = {
  onDeleteGameHistory:  {
    __typename: "GameHistory",
    id: string,
    gameID: string,
    datetime: string,
    character: string,
    action: string,
    location:  {
      __typename: "Location",
      x: number,
      y: number,
    },
  } | null,
};

export type OnCreateGameCharacterSubscription = {
  onCreateGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    email: string,
    color: string,
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
  } | null,
};

export type OnUpdateGameCharacterSubscription = {
  onUpdateGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    email: string,
    color: string,
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
  } | null,
};

export type OnDeleteGameCharacterSubscription = {
  onDeleteGameCharacter:  {
    __typename: "GameCharacter",
    id: string,
    gameID: string,
    name: string,
    email: string,
    color: string,
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
  } | null,
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
  } | null,
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
  } | null,
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
  } | null,
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
  } | null,
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
  } | null,
};
