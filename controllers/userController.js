const res = require("express/lib/response");
const User = require("../models/User");
const createError = require("../utils/createError");

exports.getMe = async (req, res, next) => {
  const user = req.user;
  res.json({ user });
};
