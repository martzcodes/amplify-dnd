export const listPublicGames = `query ListGames(
  $filter: ModelGameFilterInput
  $limit: Int
  $nextToken: String
) {
  listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      type
      active
      lastAction
      characters {
        items {
          id
          gameID
          name
          color
          hp {
            current
            max
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