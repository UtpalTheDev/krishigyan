function errorHandler(err, req, res, next) {
  console.error(err.stack) // this should call a logger at scale.
  res.status(500).json({ success: false, message: err.message })
}

module.exports = { errorHandler }