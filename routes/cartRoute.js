const express = require("express");
const cartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", cartController.getCarts);
router.post("/create", cartController.createCarts);
router.delete("/:cartId", cartController.deleteCart);

module.exports = router;
