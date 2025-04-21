import { getModelForClass, prop } from "@typegoose/typegoose";

/**
 * Сущность Image, описывающая метаданные загруженного файла.
 */
export class Image {
  @prop({ required: true })
  public url!: string;

  @prop({ required: true })
  public filename!: string;

  @prop({ required: true })
  public size!: number;
}

export const ImageModel = getModelForClass(Image);
