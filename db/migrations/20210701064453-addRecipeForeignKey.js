"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Recipes",
      "ingredientId",
      Sequelize.INTEGER,
      {
        allowNull: false,
        references: {
          model: {
            tableName: "Ingredients",
          },
          key: "id",
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Recipes", "ingredientId");
  },
};
