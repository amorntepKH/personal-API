const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.get("/", orderController.getOrders);
router.post("/create", orderController.createOrders);
router.delete("/:orderId", orderController.deleteOrders);
router.get("/all/order-item", orderController.getAllOrderItem);

module.exports = router;
