const { Cart } = require("../models");
const createError = require("../utils/createError");

exports.createCarts = async (req, res, next) => {
  try {
    const { amount, userId, productId } = req.body;
    const carts = await Cart.create({
      amount,
      userId,
      productId,
    });
    res.status(201).json({ carts });
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const carts = await Cart.destroy({
      where: { id: cartId },
    });
    if (!carts) {
      createError("Cart not found", 404);
    }
    res.status(201).json({ message: "delete cart accepted" });
  } catch (error) {
    next(error);
  }
};

exports.getCarts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const carts = await Cart.findAll({ where: { userId: id } });

    res.status(201).json({ carts });
  } catch (err) {
    next(err);
  }
};
