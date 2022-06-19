const { Product } = require("../models");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");

exports.createProduct = async (req, res, next) => {
  // console.log("req =====> \n", req.body);
  try {
    const { name, price, isInstock } = req.body;
    console.log("req.file");
    console.log(req.file);
    console.log(req.body);
    let image;
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
    }

    const products = await Product.create({
      name,
      image,
      price,
      isInstock,
    });

    res.status(201).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    console.log(req.params);
    const { productId } = req.params;
    console.log(productId);
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

exports.getProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["id", "desc"]],
    });

    res.json({ products });
  } catch (err) {
    next(err);
  }
};
