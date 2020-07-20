const { database } = require('./database');

const voteToClap = 10;
const saveUsers = async (oldDb, newDb) => {
  const userProfiles = await oldDb.doQuery('select * from qa_userprofile order by userid desc');

  let id;
  let description;
  const userDescriptions = new Map();
  const titleToPersian = new Map();
  titleToPersian.set('about', 'درباره');
  titleToPersian.set('location', 'موقعیت');
  titleToPersian.set('name', 'نام');
  titleToPersian.set('website', 'وبسایت');
  titleToPersian.set('زمینه-تخصص', 'زمینه-تخصص');
  titleToPersian.set('سن', 'سن');
  titleToPersian.set('علاقه-مندی-ها', 'علاقه-مندی-ها');
  userProfiles.forEach((userData) => {
    if (userData.userid !== id) {
      if (id) {
        userDescriptions.set(id, description);
      }
      id = userData.userid;
      description = '';
    } else if (userData.content.length > 0) {
      description += `${titleToPersian.get(userData.title)} : ${userData.content}\n`;
    }
  });
  userDescriptions.set(id, description);
  const users = await oldDb.doQuery(`SELECT qa_users.*,concat(qa_blobs.blobid,".",qa_blobs.format) as profileImage from qa_users LEFT join qa_blobs ON
    qa_users.avatarblobid=qa_blobs.blobid`);
  const promises = users.map(async (user) => {
    const newUser = user;
    newUser.description = userDescriptions.get(user.userid);
    const query = `INSERT INTO users (id,publicName, profileImage, about, 
          email,passwordSalt,passwordCheck,lastLogin,lastWrite,createdAt,updatedAt)
                               VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
    await newDb.doQuery(query, [
      newUser.userid,
      newUser.handle,
      newUser.profileImage,
      newUser.description,
      newUser.email,
      newUser.passsalt,
      newUser.passcheck,
      newUser.loggedin,
      newUser.written,
      newUser.created,
      newUser.created,
    ]);
  });
  return Promise.all(promises);
};

const getPostTags = async (oldDb, postId) => {
  return oldDb.doQuery(
    'select qa_words.word as tag from qa_posttags join qa_words on qa_posttags.wordid=qa_words.wordid where qa_posttags.postid =? and qa_words.tagcount>0',
    [postId]
  );
};
const getAnswersCount = async (oldDb, postId) => {
  const answers = await oldDb.doQuery(
    'select * from qa_posts where qa_posts.parentid=? and qa_posts.type="A"',
    [postId]
  );
  return answers.length;
};
const savePosts = async (oldDb, newDb) => {
  const posts = await oldDb.doQuery('select * from qa_posts');

  // eslint-disable-next-line complexity
  const promises = posts.map(async (newPost) => {
    const query = `INSERT INTO posts (id,type,title, content, viewsCount, 
          votesCount,parentId,userId,createdAt,updatedAt)
                               VALUES (?,?,?,?,?,?,?,?,?,?);`;
    let type = '';
    if (newPost.type === 'C') {
      type = 'COMMENT';
    } else if (newPost.type === 'Q') {
      type = 'QUESTION';
    } else if (newPost.type === 'A') {
      type = 'ANSWER';
    } else if (newPost.type === 'C_HIDDEN') {
      type = 'COMMENT_HIDDEN';
    } else if (newPost.type === 'Q_HIDDEN') {
      type = 'QUESTION_HIDDEN';
    } else if (newPost.type === 'A_HIDDEN') {
      type = 'ANSWER_HIDDEN';
    } else {
      return null;
    }
    try {
      await newDb.doQuery(query, [
        newPost.postid,
        type,
        newPost.title,
        newPost.content,
        newPost.views,
        newPost.netvotes * voteToClap,
        newPost.parentid,
        newPost.userid,
        newPost.created,
        newPost.updated ? newPost.updated : newPost.created,
      ]);
      const tags = await getPostTags(oldDb, newPost.postid);
      if (type === 'QUESTION') {
        const answersCount = await getAnswersCount(oldDb, newPost.postid);
        await newDb.doQuery(`update posts set answersCount=? where posts.id=?`, [
          answersCount,
          newPost.postid,
        ]);
      }
      let tagIndex = 0;
      const tagUpdatePromises = tags.map((tagObj) => {
        tagIndex += 1;
        if (tagIndex < 6)
          return newDb.doQuery(`update posts set tag${tagIndex}=? where posts.id=?`, [
            tagObj.tag,
            newPost.postid,
          ]);
        return null;
      });
      return Promise.all(tagUpdatePromises);
    } catch (e) {
      console.log('ERROR : ', e);
    }
    return null;
  });
  return Promise.all(promises);
};
const saveTags = async (oldDb, newDb) => {
  const tags = await oldDb.doQuery('select * from qa_words where tagcount>0');

  const promises = tags.map(async (newTag) => {
    const query = `INSERT INTO tags (id,title,used,createdAt,updatedAt)
                               VALUES (?,?,?,?,?);`;
    try {
      return newDb.doQuery(query, [newTag.wordid, newTag.word, newTag.tagcount, new Date(), new Date()]);
    } catch (e) {
      console.log('ERROR : ', e);
    }
    return null;
  });
  return Promise.all(promises);
};

const saveClapsRelations = async (oldDb, newDb) => {
  // userid postid count
  const tags = await oldDb.doQuery('select * from qa_uservotes where vote=1');

  const promises = tags.map(async (newTag) => {
    const query = `INSERT INTO claps (postId,userId,count,createdAt,updatedAt)
                               VALUES (?,?,?,?,?);`;
    try {
      return newDb.doQuery(query, [newTag.postid, newTag.userid, voteToClap, new Date(), new Date()]);
    } catch (e) {
      console.log('ERROR : ', e);
    }
    return null;
  });
  return Promise.all(promises);
};
(async () => {
  const oldConfig = {
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    database: '7khatcode',
    supportBigNumbers: true,
    bigNumberStrings: true,
  };
  const newConfig = {
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    database: '7khatcode2',
    supportBigNumbers: true,
    bigNumberStrings: true,
  };
  const oldDb = await database(oldConfig).getInstance();
  const newDb = await database(newConfig).getInstance();
  await saveUsers(oldDb, newDb);
  await savePosts(oldDb, newDb);
  await saveTags(oldDb, newDb);
  await saveClapsRelations(oldDb, newDb);
  console.log('FINISHED');
})();
