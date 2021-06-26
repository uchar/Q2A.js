import Sequelize from 'sequelize';

export default {
  title: Sequelize.STRING(48),
  content: Sequelize.TEXT,
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
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
