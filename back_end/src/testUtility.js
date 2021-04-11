import databaseUtils from './db/database';

const clearTable = async (tableName) => {
  const Table = databaseUtils().loadModel(tableName);

  await Table.destroy({
    where: {},
    truncate: true,
  });
};

const makeContext = () => {
  const user = global.test_user;
  const context = { user: { id: user.id, publicName: user.publicName } };
  return context;
};

export { clearTable, makeContext };
