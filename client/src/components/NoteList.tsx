import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { notesQuery } from "../graphql/queries/note";
import { addNoteMutation } from "../graphql/mutations/note";

type INote = {
  id: string;
  content: string;
  updatedAt: Date;
};

type IFolder = {
  id: string;
  name: string;
  notes: INote[];
};

function NoteList() {
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const navigate = useNavigate();

  const { data, refetch } = useQuery<{
    folder: IFolder;
  }>(notesQuery, {
    variables: {
      folderId,
    },
  });

  const [addNote] = useMutation(addNoteMutation);

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }

    if (data?.folder?.notes?.[0]) {
      navigate(`note/${data?.folder?.notes[0]?.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, data?.folder.notes]);

  const handleAddNewNote = async () => {
    await addNote({
      variables: {
        content: "",
        folderId: folderId,
      },
    });
    refetch();
  };

  return (
    <Grid container height="100%">
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#F0EBE3",
          height: "100%",
          overflowY: "auto",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <List
          subheader={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
              <Tooltip title="Add Note" onClick={handleAddNewNote}>
                <Button variant="contained">add</Button>
              </Tooltip>
            </Box>
          }
        >
          {data?.folder?.notes?.map(({ id, content, updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    mb: "5px",
                    backgroundColor:
                      id === activeNoteId ? "rgb(255 211 140)" : null,
                  }}
                >
                  <CardContent
                    sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`,
                      }}
                    />
                    <Typography sx={{ fontSize: "10px" }}>
                      {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default NoteList;
