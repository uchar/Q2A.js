const mysql = require('mysql');
const util = require('util');

const query = (connection, sql, args) => {
  return util.promisify(connection.query).call(connection, sql, args);
};

const convertToJson = (results) => {
  if (results.map)
    return results.map((mysqlObj) => {
      return { ...mysqlObj };
    });
  return results;
};

module.exports.database = (config) => {
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
      const db = await makeDb();
      return db;
    },
  };
};
