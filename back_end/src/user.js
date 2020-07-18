const { database } = require('./database');

module.exports.getUser = async (parent, { id }) => {
  const db = await database().getInstance();
  const query =
    'SELECT qa_users.userid as id ,qa_users.handle as publicName,' +
    'concat("https://5f05e1ddde8c410011025a1b.liara.space/q2a/7khatcode-",qa_blobs.blobid,".",qa_blobs.format) as profileImage FROM `qa_users` ' +
    'LEFT JOIN qa_blobs ON qa_users.avatarblobid =qa_blobs.blobid where qa_users.handle=? ';
  const users = await db.doQuery(query, [id]);
  return users[0];
};
module.exports.getUserAbout = async (user) => {
  const { id } = user;
  console.log('FETCH : ', id);
  const db = await database().getInstance();
  const query = 'SELECT content as about from qa_userprofile where userid = ? and title=?';
  const details = await db.doQuery(query, [id, 'about']);
  return details[0].about ? details[0].about : ' ';
};
