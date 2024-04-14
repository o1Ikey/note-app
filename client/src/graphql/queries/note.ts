import { gql } from "@apollo/client";

export const notesQuery = gql`
  query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      id
      name
      notes {
        id
        content
        updatedAt
      }
    }
  }
`;

export const noteQuery = gql`
  query Note($noteId: String!) {
    note(noteId: $noteId) {
      id
      content
      updatedAt
    }
  }
`;
