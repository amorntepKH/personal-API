const { Order, OrderItem, sequelize } = require("../models");
const createError = require("../utils/createError");

exports.createOrders = async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();
    const { id } = req.user;
    const { address, totalPrice, allOrderItem } = req.body;
    const order = await Order.create(
      {
        address,

        totalPrice,
        userId: id,
      },
      { transaction: t }
    );
    const allFullOrderItem = allOrderItem.map((el) => ({
      ...el,
      orderId: order.id,
    }));

    const orderItems = await OrderItem.bulkCreate(allFullOrderItem, {
      transaction: t,
    });

    await t.commit();

    if (orderItems) {
      order.orderItems = orderItems;
    }

    res.status(201).json({ order });
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

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();

    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findAll();
    res.json({ orderItem });
  } catch (err) {
    next(err);
  }
};
