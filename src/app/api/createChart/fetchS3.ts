import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const BUCKET_NAME = process.env.NEXT_AWS_BUCKET_NAME;
const REGION = process.env.NEXT_AWS_REGION;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
  },
} as any);

export async function fetchFileFromS3(fileName: string): Promise<string> {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  try {
    const response = await s3Client.send(new GetObjectCommand(params));

    // Assuming the file's content is text, you can read it as follows:
    const bodyContents = await streamToString(response.Body as any); // Convert stream to string
    return bodyContents;
  } catch (err) {
    console.error("Error fetching from S3:", err);
    throw err;
  }
}

// Helper function to convert a Readable Stream to string
function streamToString(stream: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk: any) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
