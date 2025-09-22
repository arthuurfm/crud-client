import DefaultError from './defaultError.js';

class NotFound extends DefaultError {
  constructor(message='Page not found') {
    super(message, 404);
  }
}

export default NotFound;