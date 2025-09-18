class DefaultError extends Error {
  constructor(message="Internal Server Error", status=500, details) {
    super();
    this.message = message;
    this.status = status;
    this.details = details;
  }

  sendResponse(res) {
    res.status(this.status).send({
      status: this.status,
      message: this.message,
      details: this.details
    });
  }
}

export default DefaultError;