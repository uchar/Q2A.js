import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  endpoint: process.env.S3_ENDPOINT,
  s3ForcePathStyle: true,
});

const uploadFile = async (_, { file }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const fileType = filename.slice(filename.lastIndexOf('.'));
  const randomName = uuidv4() + fileType;
  try {
    await s3
      .upload({
        Bucket: process.env.S3_BUCKET,
        Key: `${randomName}`,
        Body: createReadStream(),
        ContentType: mimetype,
        ACL: 'public-read',
        CacheControl: 'public, max-age=50',
      })
      .promise();
  } catch (e) {
    console.error(e);
  }
  return { filename: randomName, mimetype, encoding };
};

export { uploadFile };
