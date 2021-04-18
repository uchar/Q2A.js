import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export default {
  publicName: Sequelize.STRING,
  profileImage: Sequelize.STRING,
  about: Sequelize.TEXT,
  theme: {
    type: DataTypes.ENUM(['light', 'dark']),
    allowNull: false,
    defaultValue: 'light',
  },
  language: {
    type: DataTypes.ENUM(['en', 'fa']),
    defaultValue: 'en',
  },
  role: {
    type: DataTypes.ENUM(['USER_CONFIRMED', 'USER_NOT_CONFIRMED', 'ADMIN', 'SUPER_ADMIN']),
    allowNull: false,
    defaultValue: 'USER_CONFIRMED',
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  },
  email: Sequelize.STRING(64),
  password: Sequelize.STRING(64),
  lastLogin: Sequelize.DATE,
  lastWrite: Sequelize.DATE,
  isEmailVerified: Sequelize.BOOLEAN,
};
