const { database } = require('./database');

module.exports.getQuestions = async () => {
  const db = await database().getInstance();
  console.log('A');
  const questions = await db.doQuery(
    'SELECT title,content,postid as id FROM `qa_posts` where type = "Q" limit ?  offset ? ',
    [100, 0]
  );
  return questions;
};
