import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = process.env.NEXT_AWS_BUCKET_NAME;
const REGION = process.env.NEXT_AWS_REGION;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
  },
} as any);

export async function uploadStringToS3(content: string): Promise<{ fileName: string; fileURL: string }> {
  const fileName = `${uuidv4()}.txt`;
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: content,
    ContentType: "text/plain",
  };

  try {
    let res = await s3Client.send(new PutObjectCommand(params));
    const fileURL = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`;
    return { fileName, fileURL };
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw err;
  }
}
