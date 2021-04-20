import Sequelize from 'sequelize';

export default {
  language: {
    type: Sequelize.STRING(2),
    allowNull: false,
  },
  tagsCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
  allQuestionsCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
  blogPostsCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
  usersCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
};
