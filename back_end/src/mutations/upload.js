import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  endpoint: process.env.S3_ENDPOINT,
  s3ForcePathStyle: true,
});

const uploadFile = async (_, { file }) => {
  const { stream, filename, mimetype, encoding } = await file;
  const fileType = filename.slice(filename.lastIndexOf('.'));
  const randomName = uuidv4() + fileType;
  await s3
    .upload({
      Bucket: process.env.S3_BUCKET,
      Key: `7khatcode-${randomName}`,
      Body: stream,
      ContentType: mimetype,
      ACL: 'public-read',
      CacheControl: 'public, max-age=50',
    })
    .promise();
  return { filename: randomName, mimetype, encoding };
};

export { uploadFile };
