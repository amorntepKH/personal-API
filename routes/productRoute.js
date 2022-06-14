const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/", productController.createProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
