import {
  IImageService,
  ImageService,
} from "@/application/services/image.service";
import { IImageRepository } from "@/domain/repositories/image.repository.inteface";
import { S3Service } from "@/infrastructure/aws/s3.service";
import { ImageRepository } from "@/infrastructure/db/repositories/image.repository";
import { Container } from "inversify";
import { TYPES } from "./types";

const container = new Container();

// DI Container
container.bind<IImageRepository>(TYPES.IImageRepository).to(ImageRepository);
container.bind<IImageService>(TYPES.IImageService).to(ImageService);
container.bind<S3Service>(TYPES.S3Service).to(S3Service);

export { container };
