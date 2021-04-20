import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';

const getStatistics = async (_, { language }) => {
  const Statistics = databaseUtils().loadModel(TABLES.STATISTICS_TABLE);
  const statistics = await Statistics.findOne({
    where: {
      language,
    },
  });
  return statistics;
};

export { getStatistics };
