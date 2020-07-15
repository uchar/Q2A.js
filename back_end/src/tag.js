const { database } = require('./database');

module.exports.getAllTags = async () => {
  const db = await database().getInstance();
  const tags = await db.doQuery(
    'SELECT wordid as id , tagcount as count ,word as title FROM `qa_words` ORDER BY `qa_words`.`tagcount` DESC limit ?  offset ? ',
    [100, 0]
  );
  return tags;
};
module.exports.getQuestionTags = async (question) => {
  const db = await database().getInstance();
  const tags = await db.doQuery(
    'SELECT qa_words.word as title , qa_words.wordid as id ,' +
      'qa_words.tagcount as count FROM `qa_posttags` JOIN qa_words ON qa_posttags.wordid=qa_words.wordid WHERE postid=? ',
    [question.id]
  );
  return tags;
};
