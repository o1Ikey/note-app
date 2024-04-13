export const typeDefs = `#graphql
  scalar Date

  type Folder {
    id: String!,
    name: String,
    createdAt: String,
    author: Author,
  }

  type Author {
    uid: String!,
    name: String!
  }
  type Query {
    folders(uid: String!): [Folder],
  }
   type Mutation {
    register(uid: String!, name: String!): Author
    addFolder(uid: String!,name: String!): Folder,
  }
`;
