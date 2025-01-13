class HandleError {
  showErrorMessage(res, error) {
    const status = error.status || 500; 
    const message = error.message || 'Internal Server Error';

    res.status(status).json({
      ok: false,
      error: message,
    });
  }
}

module.exports = new HandleError()