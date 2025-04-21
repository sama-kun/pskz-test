import { Image } from "@/domain/entities/image.entity";

/**
 * Интерфейс репозитория для работы с сущностью Image.
 */
export interface IImageRepository {
  /**
   * Сохраняет метаданные загруженного изображения.
   * @param image Объект Image
   */
  create(image: Partial<Image>): Promise<Image>;

  /**
   * Находит изображение по идентификатору.
   * @param id Идентификатор изображения.
   */
  findById(id: string): Promise<Image | null>;
}
