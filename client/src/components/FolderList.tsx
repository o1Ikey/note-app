import { Box, Card, CardContent, List, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";
import { useQuery } from "@apollo/client";
import { foldersQuery } from "../graphql/queries/folders";
import { AuthContext } from "../context/AuthProvider";

function FolderList() {
  const {
    user: { uid },
  } = useContext(AuthContext);

  const { data, refetch } = useQuery<{
    folders: { id: string; name: string }[];
  }>(foldersQuery, {
    variables: {
      uid: uid,
    },
  });

  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#7D9D9C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
          <NewFolder refetch={refetch} />
        </Box>
      }
    >
      {data?.folders?.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{
              textDecoration: "none",
            }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: "5px",
                backgroundColor:
                  id === activeFolderId ? "rgb(255 211 140)" : null,
              }}
            >
              <CardContent
                sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}

export default FolderList;
