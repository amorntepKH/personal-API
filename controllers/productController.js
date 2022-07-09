const { Product } = require("../models");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");
const res = require("express/lib/response");

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

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });
    if (!product) {
      createError("Product not found", 404);
    }

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, price, isInstock, productId } = req.body;
    const product = await Product.findOne({
      where: { id: productId },
    });

    if (!product) {
      createError("Product not found", 404);
    }
    let image;
    if (req.file) {
      const splited = product.image.split("/");
      const publicId = splited[splited.length - 1].split(".")[0];
      await cloudinary.destroy(publicId);
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
    }
    if (image) {
      product.image = image;
    }

    if (name) {
      product.name = name;
    }
    if (price) {
      product.price = price;
    }
    if (isInstock) {
      product.isInstock = isInstock;
    }
    product.save();
    res.json({ product });
  } catch (err) {
    next(err);
  }
};
