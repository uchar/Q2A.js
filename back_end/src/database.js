const mysql = require('mysql');
const util = require('util');

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: '7khatcode',
};

const query = (connection, sql, args) => {
  return util.promisify(connection.query).call(connection, sql, args);
};

const convertToJson = (results) => {
  return results.map((mysqlObj) => {
    return { ...mysqlObj };
  });
};

module.exports.database = () => {
  let db = null;

  const makeDb = () => {
    const connection = mysql.createConnection(config);
    return {
      doQuery: async (sql, args) => {
        const result = await query(connection, sql, args);
        return convertToJson(result);
      },
      close() {
        return util.promisify(connection.end).call(connection);
      },
    };
  };

  return {
    getInstance: async () => {
      if (!db) {
        db = await makeDb();
      }
      return db;
    },
  };
};

module.exports.withTransaction = async (db, callback) => {
  try {
    await db.beginTransaction();
    await callback();
    await db.commit();
  } catch (err) {
    await db.rollback();
    throw err;
  }
};
