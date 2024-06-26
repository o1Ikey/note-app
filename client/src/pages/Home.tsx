import { Box, Grid, Typography } from "@mui/material";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import FolderList from "../components/FolderList";

function Home() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Note App
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          mb: "10px",
        }}
      >
        <UserMenu />
      </Box>
      <Grid
        container
        sx={{
          height: "50vh",
          boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)",
          overflow: "hidden",
          flexWrap: "nowrap",
        }}
      >
        <Grid item xs={3} sx={{ height: "100%" }}>
          <FolderList />
        </Grid>
        <Grid item xs={9} sx={{ height: "100%", marginLeft: "20px" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
