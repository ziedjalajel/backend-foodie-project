const { Recipe } = require("../db/models");

exports.recipeFetch = async (recipeId, next) => {
  try {
    const recipe = await Recipe.findByPk(recipeId);
    return recipe;
  } catch (error) {
    next(error);
  }
};
exports.recipeCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
    console.log(newRecipe);
  } catch (error) {
    next(error);
  }
};
exports.recipeList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.json(recipes);
    console.log(recipes);
  } catch (error) {
    next(error);
  }
};
