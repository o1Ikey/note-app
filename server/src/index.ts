import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.asfsnju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT;

mongoose
  .connect(MONGODB_URI, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .then(() => startSever())
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const startSever = async () => {
  const app = express();

  const typeDefs = `#graphql
    type Query{
      name:String
    }
  `;

  const resolvers = {};
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  // Enable req.body data
  app.use(express.json());

  app.use(cors());

  app.listen(PORT, () =>
    console.log(
      `Server started on port ${PORT}. GraphQL server started on http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
};
