'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('transaction', 'payment_status', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: 'paid',
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('transaction', 'payment_status');
  },
};
