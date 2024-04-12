import { gql } from "@apollo/client";

export const registerMutation = gql`
  mutation register($uid: String!, $name: String!) {
    register(uid: $uid, name: $name) {
      uid
      name
    }
  }
`;
