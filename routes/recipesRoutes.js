const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  recipeFetch,
  recipeCreate,
  recipeList,
} = require("../controllers/recipeController");

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await recipeFetch(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    const err = new Error("Recipe Not Found");
    err.status = 404;
    next(err);
  }
});
router.post("/", upload.single("image"), recipeCreate);
router.get("/", recipeList);

module.exports = router;
