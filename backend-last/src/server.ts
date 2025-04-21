// import { graphqlUploadExpress } from "@/@types/graphql-upload";
import { container } from "@/config/container";
import { resolvers, typeDefs } from "@/interfaces/graphql/image.resolver";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import "reflect-metadata";

dotenv.config();

const startServer = async () => {
  // Подключение к MongoDB
  await mongoose.connect(process.env.MONGODB_URI || "", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      container, // передаем DI-контейнер в контекст GraphQL
    }),
  });
  await server.start();
  server.applyMiddleware({ app: app as any });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer().catch((error) => {
  console.error("Ошибка при запуске сервера:", error);
});
