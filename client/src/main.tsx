import ReactDOM from "react-dom/client";
import { Container } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./firebase/config";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: "50px" }}>
      <RouterProvider router={router} />
    </Container>
  </ApolloProvider>
);
