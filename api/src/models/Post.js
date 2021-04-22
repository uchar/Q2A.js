import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export default {
  type: {
    type: DataTypes.ENUM([
      'QUESTION',
      'ANSWER',
      'COMMENT',
      'QUESTION_HIDDEN',
      'ANSWER_HIDDEN',
      'COMMENT_HIDDEN',
    ]),
    allowNull: false,
  },
  language: {
    type: Sequelize.STRING(2),
    allowNull: false,
  },
  title: Sequelize.STRING(256),
  content: Sequelize.TEXT,
  viewsCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
  votesCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
  answersCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
  // Usually in forums reading items is a lot more than writing , so we try to denormalize wherever possible
  // and not use M:N relationships and table joins
  tag1: Sequelize.STRING(32),
  tag2: Sequelize.STRING(32),
  tag3: Sequelize.STRING(32),
  tag4: Sequelize.STRING(32),
  tag5: Sequelize.STRING(32),
  parentId: {
    type: Sequelize.UUID,
    primaryKey: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
};
