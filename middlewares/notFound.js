module.exports = (req, res, next) => {
  res.status(404).json({ message: "resouce not found on this server" });
};
