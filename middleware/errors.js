const ErrorResponse = require('./../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  let error = {
    ...err,
  };

  error.message = err.message;
  // Log to console for dev
  console.log(err.stack.red);
  console.log(err);

  // Mongoose bad ObjectID
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongose duplicare key
  if (error.code === 11000) {
    const message = `duplicate field evalue entered`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation errors
  if (err.name === 'ValidatorError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.log(err.name);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'server error',
  });
};

module.exports = errorHandler;
