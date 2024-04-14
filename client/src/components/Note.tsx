import { useMutation, useQuery } from "@apollo/client";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { useEffect, useMemo, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useLocation, useParams } from "react-router-dom";
import { noteQuery } from "../graphql/queries/note";
import draftToHtml from "draftjs-to-html";
import { debounce } from "@mui/material";
import { updateNoteMutation } from "../graphql/mutations/note";

function Note() {
  const location = useLocation();
  const { noteId } = useParams();

  const { data } = useQuery(noteQuery, {
    variables: {
      noteId,
    },
  });

  const [updateNote] = useMutation(updateNoteMutation);
  const [rawHTML, setRawHTML] = useState(data?.note?.content);

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(data?.note?.content ?? "");

    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.note?.id]);

  useEffect(() => {
    debouncedMemorized(rawHTML, data?.note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML, location.pathname]);

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note) => {
      if (rawHTML === note.content) return;
      updateNote({
        variables: {
          id: note?.id,
          content: rawHTML,
        },
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRawHTML(data?.note?.content);
  }, [data?.note?.content]);

  const handleOnChange = (e: EditorState) => {
    setEditorState(e);

    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something!"
    />
  );
}

export default Note;
