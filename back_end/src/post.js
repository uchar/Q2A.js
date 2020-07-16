const { database } = require('./database');

const getPostQuery = (
  type,
  whereClause = undefined,
  orderByClause = undefined,
  haveLimit = false,
  haveOffset = false
) => {
  let query =
    'SELECT qa_posts.title,qa_posts.content,qa_posts.postid as id,qa_users.handle as creator,UNIX_TIMESTAMP(qa_posts.created) as createdAt,' +
    'concat("https://5f05e1ddde8c410011025a1b.liara.space/q2a/7khatcode-",qa_blobs.blobid,".",qa_blobs.format) as profileImage FROM `qa_posts` ' +
    'Left JOIN qa_users ON qa_posts.userid = qa_users.userid LEFT JOIN qa_blobs ON qa_users.avatarblobid =qa_blobs.blobid ';
  query += `where type='${type}'`;
  if (whereClause) query += ` and ${whereClause} `;
  if (orderByClause) query += `${orderByClause} `;
  if (haveLimit) query += `limit ? `;
  if (haveOffset) query += `offset ? `;
  return query;
};
module.exports.getLatestQuestions = async () => {
  const db = await database().getInstance();
  const query = getPostQuery('Q', undefined, 'order by UNIX_TIMESTAMP(qa_posts.created) desc', true, true);
  const questions = await db.doQuery(query, [30, 0]);
  return questions;
};
module.exports.getPopularQuestions = async () => {
  const db = await database().getInstance();
  const query = getPostQuery('Q', undefined, 'order by qa_posts.netvotes desc', true, true);
  const questions = await db.doQuery(query, [30, 0]);
  return questions;
};
module.exports.getMostViewsQuestions = async () => {
  const db = await database().getInstance();
  const query = getPostQuery('Q', undefined, 'order by qa_posts.views desc', true, true);
  const questions = await db.doQuery(query, [30, 0]);
  return questions;
};
module.exports.getNoAnswersQuestions = async () => {
  const db = await database().getInstance();
  const query = getPostQuery(
    'Q',
    '(SELECT Count(*) from qa_posts as qa_posts_inner where qa_posts.postid=qa_posts_inner.parentid)>0',
    'order by UNIX_TIMESTAMP(qa_posts.created) desc',
    true,
    true
  );
  const questions = await db.doQuery(query, [30, 0]);
  return questions;
};

module.exports.getQuestion = async (parent, { id }) => {
  const db = await database().getInstance();
  const query = getPostQuery('Q', 'qa_posts.postid=?');
  const questions = await db.doQuery(query, [id]);
  return questions[0];
};

module.exports.getAnswers = async (post) => {
  const { id } = post;
  const db = await database().getInstance();
  const query = getPostQuery('A', 'qa_posts.parentid=?');
  const answers = await db.doQuery(query, [id]);
  return answers;
};

module.exports.getComments = async (post) => {
  const { id } = post;
  const db = await database().getInstance();
  const query = getPostQuery('C', 'qa_posts.parentid=?');
  const comments = await db.doQuery(query, [id]);
  return comments;
};
