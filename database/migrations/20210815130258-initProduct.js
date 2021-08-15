'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          '"product"',
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
            },
            stock: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
            },
            price: {
              type: Sequelize.DataTypes.DECIMAL(17, 2),
              allowNull: false,
            },
            name: {
              type: Sequelize.DataTypes.STRING(500),
              allowNull: false,
            },
            images: {
              type: Sequelize.DataTypes.JSONB,
              allowNull: false,
            },
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('"product"');
  },
};
