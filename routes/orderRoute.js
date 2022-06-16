const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.get("/", orderController.getOrders);
router.post("/", orderController.createOrders);
router.delete("/:orderId", orderController.deleteOrders);

module.exports = router;
