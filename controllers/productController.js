const { Product } = require("../models");
const createError = require("../utils/createError");

exports.createProduct = async (req, res, next) => {
  console.log("first");
  try {
    const { name, price, isInstock, userId } = req.body;
    const products = await Product.create({
      name,
      price,
      isInstock,
      userId,
    });
    res.status(201).json({ products });
  } catch (err) {
    console.log("first");
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const products = await Product.destroy({
      where: { id: productId },
    });
    if (!products) {
      createError("Product not found", 404);
    }
    res.json({ message: "delete product accepted" });
  } catch (err) {
    next(err);
  }
};
