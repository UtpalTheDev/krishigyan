function routeNotFound(req, res, next) {
  res.status(404).json({ success: false, message: "the route you're looking for couldn't be found" })
}

module.exports = { routeNotFound }