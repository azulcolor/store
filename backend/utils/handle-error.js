class HandleError {
  showErrorMessage(res, error) {
    res.status(404).json(error);
  }
}

module.exports = new HandleError()