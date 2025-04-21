import AWS from "aws-sdk";
import fs from "fs";
import { injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.s3 = new AWS.S3();
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || "";
  }

  /**
   * Загружает файл на AWS S3 и возвращает публичный URL.
   * @param file Файл изображения
   */
  public async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileContent = fs.readFileSync(file.path);
    const fileKey = `${uuidv4()}-${file.originalname}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: fileContent,
      ACL: "public-read",
    };

    await this.s3.putObject(params).promise();
    return `https://${this.bucketName}.s3.amazonaws.com/${fileKey}`;
  }
}
