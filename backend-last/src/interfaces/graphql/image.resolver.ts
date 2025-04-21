import { IImageService } from "@/application/services/image.service";
import { TYPES } from "@/config/types";
import { IResolvers } from "@graphql-tools/utils";
import { Container } from "inversify";

// Типы GraphQL можно определить через SDL или использовать libraries типа type-graphql
// Здесь приведён простой вариант с использованием схемы с Apollo Server.

export const typeDefs = `
  type Image {
    id: ID!
    url: String!
    filename: String!
  }

  type Query {
    getImageById(id: ID!): Image
  }

  type Mutation {
    uploadImage(file: Upload!): Image!
  }

  scalar Upload
`;

export const resolvers: IResolvers = {
  Query: {
    getImageById: async (
      _: any,
      { id }: { id: string },
      { container }: { container: Container }
    ) => {
      const imageService = container.get<IImageService>(TYPES.IImageService);
      return imageService.getImageById(id);
    },
  },
  Mutation: {
    uploadImage: async (
      _: any,
      { file }: { file: Promise<any> },
      { container }: { container: Container }
    ) => {
      const imageService = container.get<IImageService>(TYPES.IImageService);

      const { createReadStream, filename, mimetype, encoding } = await file;

      const stream = createReadStream();
      const tempPath = `/tmp/${filename}`;
      const out = require("fs").createWriteStream(tempPath);
      stream.pipe(out);

      await new Promise<void>((resolve, reject) => {
        out.on("finish", () => resolve());
        out.on("error", (err: any) => reject(err));
      });
      const multerFile = {
        path: tempPath,
        originalname: filename,
        mimetype,
        encoding,
      };

      return imageService.uploadImage(multerFile as Express.Multer.File);
    },
  },
};
