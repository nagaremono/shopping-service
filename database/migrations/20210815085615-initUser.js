'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          '"user"',
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
            },
            username: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
            },
            email: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
              unique: true,
            },
            password: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('"user"');
  },
};
