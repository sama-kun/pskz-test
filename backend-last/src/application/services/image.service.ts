import { TYPES } from "@/config/types";
import { Image } from "@/domain/entities/image.entity";
import { IImageRepository } from "@/domain/repositories/image.repository.inteface";
import { S3Service } from "@/infrastructure/aws/s3.service";
import { inject, injectable } from "inversify";

export interface IImageService {
  uploadImage(file: Express.Multer.File): Promise<Image>;
  getImageById(id: string): Promise<Image | null>;
}

/**
 * Сервис для работы с изображениями: загрузка на S3 и сохранение в БД.
 */
@injectable()
export class ImageService implements IImageService {
  constructor(
    @inject(TYPES.IImageRepository) private imageRepository: IImageRepository,
    @inject(TYPES.S3Service) private s3Service: S3Service
  ) {}

  /**
   * Загружает файл на AWS S3 и сохраняет метаданные изображения.
   * @param file Файл изображения, полученный через multer
   */
  public async uploadImage(file: Express.Multer.File): Promise<Image> {
    // Загрузка файла на AWS S3
    const s3Url = await this.s3Service.uploadFile(file);

    // Сохранение метаданных в БД
    const image = await this.imageRepository.create({
      url: s3Url,
      filename: file.originalname,
    });
    return image;
  }

  /**
   * Возвращает изображение по идентификатору.
   * @param id Идентификатор изображения.
   */
  public async getImageById(id: string): Promise<Image | null> {
    return this.imageRepository.findById(id);
  }
}
