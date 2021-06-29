const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();

const {
  categoryFetch,
  categoryCreate,
  categoryList,
  ingredientCreate,
} = require("../controllers/categoryController");

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await categoryFetch(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    const err = new Error("Category Not Found");
    err.status = 404;
    next(err);
  }
});
router.post("/", upload.single("image"), categoryCreate);
router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  ingredientCreate
);
router.get("/", categoryList);

module.exports = router;
