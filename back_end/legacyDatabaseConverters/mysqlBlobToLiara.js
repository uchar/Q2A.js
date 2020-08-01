const AWS = require('aws-sdk');
const { database } = require('./database');

(async () => {
  const db = await database().getInstance();
  const blobs = await db.doQuery('SELECT * from qa_blobs');
  let index = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const blob of blobs) {
    // This must run inside a function marked `async`:
    index += 1;
    console.log(`${index} from : ${blobs.length}`);
    console.log(`7khatcode-${blob.blobid}.${blob.format}`);

    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      endpoint: process.env.S3_ENDPOINT,
      s3ForcePathStyle: true,
    });

    const bucket = 'q2a';
    const key = `7khatcode-${blob.blobid}.${blob.format}`;
    // eslint-disable-next-line no-await-in-loop
    const exists = await s3
      .headObject({
        Bucket: bucket,
        Key: key,
      })
      .promise()
      .then(
        () => true,
        (err) => {
          if (err.code === 'NotFound') {
            return false;
          }
          console.error(err);
          throw err;
        }
      );

    if (exists) {
      console.log('File exists,Skipping...');
    }
    if (!exists) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await s3
          .putObject({
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Body: blob.content,
            ContentType: blob.format,
            ACL: 'public-read',
            CacheControl: 'public, max-age=50',
          })
          .promise();
      } catch (error) {
        console.error(`Error in uploading ${key}`, error);
      }
    }
  }
  console.log('FINISHED');
  return blobs;
})();
