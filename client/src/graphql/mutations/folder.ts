import { gql } from "@apollo/client";

export const addFolderMutation = gql`
  mutation addFolder($uid: String!, $name: String!) {
    addFolder(uid: $uid, name: $name) {
      name
    }
  }
`;
