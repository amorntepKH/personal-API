const { OrderItem } = require("../models");
const createError = require("../utils/createError");

exports.createOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.create(req.body);
    res.status(201).json(orderItem);
  } catch (err) {
    next(err);
  }
};
