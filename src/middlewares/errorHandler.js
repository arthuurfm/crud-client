import mongoose from 'mongoose';
import DefaultError from '../errors/defaultError.js';
import BadRequest from '../errors/BadRequest.js';
import ValidationError from '../errors/ValidationError.js';

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new BadRequest().sendResponse(res);
  } 
  
  else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  }

  else if (error instanceof DefaultError) {
    error.sendResponse(res);
  }
  
  else {
    new DefaultError().sendResponse(res);
  }
}

export default errorHandler;