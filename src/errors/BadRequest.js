import DefaultError from './defaultError.js';

class BadRequest extends DefaultError {
  constructor(message='Incorrectly Provided Data', details) {
    super(message, 400);
    this.details = details;
  }
}

export default BadRequest;