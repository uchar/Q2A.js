import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export default {
  reason: DataTypes.ENUM([
    'QUESTION_CLAPPED',
    'ANSWER_CLAPPED',
    'COMMENT_CLAPPED',
    'ANSWER_RECEIVED',
    'COMMENT_RECEIVED',
    'QUESTION_HIDED',
    'ANSWER_HIDED',
    'COMMENT_HIDED',
  ]),
  title: Sequelize.TEXT,
  content: Sequelize.TEXT,
  metaData: Sequelize.TEXT,
  language: {
    type: Sequelize.STRING(2),
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};
