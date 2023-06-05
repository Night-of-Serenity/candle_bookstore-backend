const notFoundMiddleware = (req, res) => {
  res.status(404).json({ message: "resources not found ont this server" });
};

module.exports = notFoundMiddleware;
