import { RequestHandler } from "express";

declare module "graphql-upload" {
  export interface Options {
    maxFileSize?: number;
    maxFiles?: number;
  }

  /**
   * Middleware для обработки загрузки файлов через GraphQL.
   */
  export function graphqlUploadExpress(options?: Options): RequestHandler;
}
