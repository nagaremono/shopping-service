'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          '"transaction"',
          {
            id: {
              type: Sequelize.DataTypes.UUID,
              primaryKey: true,
              defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            transactionDate: {
              type: Sequelize.DataTypes.DATE,
              defaultValue: Sequelize.DataTypes.NOW,
              field: 'transaction_date',
            },
            customerId: {
              type: Sequelize.DataTypes.INTEGER,
              field: 'customer_id',
              allowNull: false,
              references: {
                model: {
                  tableName: '"user"',
                  schema: 'public',
                },
                key: 'id',
              },
            },
            totalAmount: {
              type: Sequelize.DataTypes.DECIMAL(17, 2),
              allowNull: false,
            },
          },
          {
            transaction: t,
          }
        ),
        queryInterface.createTable(
          '"sold_item"',
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
            },
            quantity: {
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
            transactionId: {
              type: Sequelize.DataTypes.UUID,
              allowNull: false,
              field: 'transaction_id',
              references: {
                model: {
                  tableName: '"transaction"',
                  schema: 'public',
                },
                key: 'id',
              },
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
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('"sold_item"', { transaction: t }),
        queryInterface.dropTable('"transaction"', { transaction: t }),
      ]);
    });
  },
};
