'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'user',
          'createdAt',
          {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'user',
          'updatedAt',
          {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'transaction',
          'createdAt',
          {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'transaction',
          'updatedAt',
          {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'sold_item',
          'createdAt',
          {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'sold_item',
          'updatedAt',
          {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'product',
          'createdAt',
          {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'product',
          'updatedAt',
          {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('user', 'createdAt', { transaction: t }),
        queryInterface.removeColumn('user', 'updatedAt', { transaction: t }),
        queryInterface.removeColumn('transaction', 'createdAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('transaction', 'updatedAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('sold_item', 'createdAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('sold_item', 'updatedAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('product', 'createdAt', { transaction: t }),
        queryInterface.removeColumn('product', 'updatedAt', { transaction: t }),
      ]);
    });
  },
};
