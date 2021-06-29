const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  ingredientFetch,
  ingredientList,
  ingredientDetail,
} = require("../controllers/ingredientController");

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredient = await ingredientFetch(ingredientId, next);
  if (ingredient) {
    req.ingredient = ingredient;
    next();
  } else {
    const err = new Error("Ingredient Not Found");
    err.status = 404;
    next(err);
  }
});
router.get("/", ingredientList);
router.get("/:ingredientId", ingredientDetail);
module.exports = router;
