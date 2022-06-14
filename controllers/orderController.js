const { Order } = require("../models");
const createError = require("../utils/createError");
exports.createOrders = async (req, res, next) => {
  console.log("firstName");
  try {
    const { address, shippingCost, totalPrice, userId } = req.body;
    const orders = await Order.create({
      address,
      shippingCost,
      totalPrice,
      userId,
    });
    res.status(201).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrders = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const orders = await Order.destroy({
      where: { id: orderId },
    });

    if (!orders) {
      createError("Order not found", 404);
    }
    // if (orders.userId !== req.user.id) {
    //   createError("you have no permission", 403);
    // }

    // await orders.destroy();
    res.json({ message: "delete oder accepted" });
  } catch (err) {
    next(err);
  }
};
