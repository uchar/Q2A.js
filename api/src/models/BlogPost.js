import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export default {
  type: {
    type: DataTypes.ENUM(['POST', 'COMMENT', 'POST_HIDDEN', 'COMMENT_HIDDEN']),
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
  commentsCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
  tag1: Sequelize.STRING(48),
  tag2: Sequelize.STRING(48),
  tag3: Sequelize.STRING(48),
  tag4: Sequelize.STRING(48),
  tag5: Sequelize.STRING(48),
  parentId: {
    type: Sequelize.UUID,
    primaryKey: false,
  },
};
