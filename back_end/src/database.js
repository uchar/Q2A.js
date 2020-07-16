const mysql = require('mysql');
const util = require('util');

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: '7khatcode',
  supportBigNumbers: true,
  bigNumberStrings: true,
};

const query = (connection, sql, args) => {
  return util.promisify(connection.query).call(connection, sql, args);
};

const convertToJson = (results) => {
  return results.map((mysqlObj) => {
    return { ...mysqlObj };
  });
};

let db = null;

module.exports.database = () => {
  const makeDb = () => {
    const connection = mysql.createConnection(config);
    return {
      doQuery: async (sql, args) => {
        const result = await query(connection, sql, args);
        return convertToJson(result);
      },
      withTransaction: async (runMethod) => {
        try {
          await db.beginTransaction();
          await runMethod();
          await db.commit();
        } catch (err) {
          await db.rollback();
          throw err;
        }
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
