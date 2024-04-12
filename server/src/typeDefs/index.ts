export const typeDefs = `#graphql
  type Author {
    uid: String!,
    name: String!
  }
  type Query {
    name:String
  }
   type Mutation {
    register(uid: String!, name: String!): Author
  }
`;
