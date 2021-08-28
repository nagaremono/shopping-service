'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('sold_item', 'product_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: '"product"',
          schema: 'public',
        },
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('sold_item', 'product_id');
  },
};
