import { gql } from "@apollo/client";

export const addNoteMutation = gql`
  mutation addNote($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }
`;

export const updateNoteMutation = gql`
  mutation updateNote($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }
`;
