import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useMutation } from "@apollo/client";
import { registerMutation } from "../graphql/mutations/register";
import { Navigate } from "react-router-dom";

function Login() {
  const auth = getAuth();

  const [register] = useMutation(registerMutation);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    return await register({
      variables: {
        uid,
        name: displayName,
      },
    });
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "10px",
        }}
      >
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}

export default Login;
