import { Image, ImageModel } from "@/domain/entities/image.entity";
import { IImageRepository } from "@/domain/repositories/image.repository.inteface";
import { injectable } from "inversify";

@injectable()
export class ImageRepository implements IImageRepository {
  public async create(imageData: Partial<Image>): Promise<Image> {
    const image = new ImageModel(imageData);
    return image.save();
  }

  public async findById(id: string): Promise<Image | null> {
    return ImageModel.findById(id).exec();
  }
}
