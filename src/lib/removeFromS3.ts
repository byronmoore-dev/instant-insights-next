import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const BUCKET_NAME = process.env.NEXT_AWS_BUCKET_NAME;
const REGION = process.env.NEXT_AWS_REGION;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
  },
} as any);

export async function removeObjectFromS3(fileName: string) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(params));
  } catch (err) {
    console.error("Error removing object from S3:", err);
    throw err;
  }
}
