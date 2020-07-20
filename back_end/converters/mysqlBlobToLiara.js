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
      accessKeyId: 'KR6JB3JWN5RDP078U0WHR',
      secretAccessKey: 'X10TuBo2xc3tsAzPJNpQqUSsiOffghslYwnjGWIFn',
      endpoint: '5f05e1ddde8c410011025a1b.liara.space',
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
            Bucket: 'q2a',
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
