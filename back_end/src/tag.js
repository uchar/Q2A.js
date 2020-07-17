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
    'SELECT qa_words.word as title , qa_words.wordid as id  ,' +
      ' qa_words.tagcount as count FROM `qa_posttags` JOIN qa_words ON qa_posttags.wordid=qa_words.wordid' +
      '  WHERE qa_posttags.postid=? ',
    [question.id]
  );

  return tags;
};
module.exports.getTagDetail = async (parent, { tag }) => {
  const db = await database().getInstance();
  const tags = await db.doQuery(
    'SELECT qa_words.word as title , qa_words.wordid as id ,qa_tagmetas.content as content ,' +
      ' qa_words.tagcount as count FROM `qa_words`' +
      ' JOIN qa_tagmetas ON qa_tagmetas.tag=qa_words.word WHERE qa_words.word=? and qa_tagmetas.title=? ',
    [tag, 'description']
  );
  return tags[0];
};
