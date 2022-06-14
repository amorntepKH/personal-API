const { Order } = require("../models");
const createError = require("../utils/createError");

exports.createOrders = async (req, res, next) => {
  try {
    const { address, shippingCost, userId } = req.body;
    const orders = await Order.create({
      address,
      shippingCost,
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
    res.json({ message: "delete order accepted" });
  } catch (err) {
    next(err);
  }
};
