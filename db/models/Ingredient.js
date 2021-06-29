const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Ingredient, {
    source: ["name"],
  });
  Ingredient.associate = (models) => {
    models.Category.hasMany(Ingredient, {
      foreignKey: "categoryId",
      as: "ingredients",
      allowNull: false,
    });
    Ingredient.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });
  };
  return Ingredient;
};
