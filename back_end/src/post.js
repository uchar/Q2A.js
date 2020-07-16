const { database } = require('./database');

const getPostQuery = (
  type,
  whereClause = undefined,
  orderByClause = undefined,
  haveLimit = false,
  haveOffset = false
) => {
  let query =
    'SELECT qa_posts.title,qa_posts.views as viewsCount ,qa_posts.netvotes as votesCount,qa_posts.content,' +
    'qa_posts.postid as id,qa_users.handle as creator,UNIX_TIMESTAMP(qa_posts.created) as createdAt,' +
    'concat("https://5f05e1ddde8c410011025a1b.liara.space/q2a/7khatcode-",qa_blobs.blobid,".",qa_blobs.format) as profileImage FROM `qa_posts` ' +
    'Left JOIN qa_users ON qa_posts.userid = qa_users.userid LEFT JOIN qa_blobs ON qa_users.avatarblobid =qa_blobs.blobid ';
  query += `where type='${type}'`;
  if (whereClause) query += ` and ${whereClause} `;
  if (orderByClause) query += `${orderByClause} `;
  if (haveLimit) query += `limit ? `;
  if (haveOffset) query += `offset ? `;
  return query;
};

const getTagWhereClause = (tag) => {
  let whereClause;
  if (tag) {
    whereClause = `(SELECT Count(*) from qa_posttags JOIN qa_words ON qa_posttags.wordid=qa_words.wordid 
     WHERE qa_posttags.postid=qa_posts.postid and qa_words.word="${tag}")>0`;
  }
  return whereClause;
};
module.exports.getLatestQuestions = async (parent, { tag }) => {
  const db = await database().getInstance();
  const whereClause = getTagWhereClause(tag);
  const query = getPostQuery('Q', whereClause, 'order by UNIX_TIMESTAMP(qa_posts.created) desc', true, true);
  const questions = await db.doQuery(query, [25, 0]);
  return questions;
};

module.exports.getPopularQuestions = async (parent, { tag }) => {
  const db = await database().getInstance();
  const whereClause = getTagWhereClause(tag);
  const query = getPostQuery('Q', whereClause, 'order by qa_posts.netvotes desc', true, true);
  const questions = await db.doQuery(query, [30, 0]);
  return questions;
};

module.exports.getMostViewsQuestions = async (parent, { tag }) => {
  const db = await database().getInstance();
  const whereClause = getTagWhereClause(tag);
  const query = getPostQuery('Q', whereClause, 'order by qa_posts.views desc', true, true);
  const questions = await db.doQuery(query, [30, 0]);
  return questions;
};

module.exports.getNoAnswersQuestions = async (parent, { tag }) => {
  const db = await database().getInstance();
  let whereClause = getTagWhereClause(tag);
  if (whereClause === undefined) {
    whereClause = '';
  } else {
    whereClause =
      `${whereClause} and ` +
      `(SELECT Count(*) from qa_posts as qa_posts_inner where qa_posts.postid=qa_posts_inner.parentid)>0`;
  }
  const query = getPostQuery('Q', whereClause, 'order by UNIX_TIMESTAMP(qa_posts.created) desc', true, true);
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
  const query = getPostQuery('A', 'qa_posts.parentid=?', 'order by qa_posts.netvotes desc');
  const answers = await db.doQuery(query, [id]);
  return answers;
};

module.exports.getAnswersCount = async (post) => {
  const { id } = post;
  const db = await database().getInstance();
  const query = getPostQuery('A', 'qa_posts.parentid=?');
  const answers = await db.doQuery(query, [id]);
  return answers.length;
};

module.exports.getComments = async (post) => {
  const { id } = post;
  const db = await database().getInstance();
  const query = getPostQuery('C', 'qa_posts.parentid=?');
  const comments = await db.doQuery(query, [id]);
  return comments;
};
