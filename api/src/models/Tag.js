import Sequelize from 'sequelize';

export default {
  title: Sequelize.STRING(32),
  content: Sequelize.TEXT,
  language: {
    type: Sequelize.STRING(2),
    allowNull: false,
  },
  used: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
};
