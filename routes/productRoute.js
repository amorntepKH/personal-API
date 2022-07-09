const express = require("express");
const productController = require("../controllers/productController");
const authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById);
router.patch(
  "/update",
  upload.single("image"),
  productController.updateProduct
);

router.post(
  "/",
  isAdmin,
  upload.single("image"),
  productController.createProduct
);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
