import { gql } from "@apollo/client";

export const foldersQuery = gql`
  query folders($uid: String!) {
    folders(uid: $uid) {
      id
      name
      createdAt
    }
  }
`;
