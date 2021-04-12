import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export default {
  type: DataTypes.ENUM(['GOLD', 'SILVER', 'BRONZE']),
  name: Sequelize.STRING(64),
  language: {
    type: Sequelize.STRING(2),
    allowNull: false,
  },
};
