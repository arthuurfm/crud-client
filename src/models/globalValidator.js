import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
  validator: (value) => {
    return value.trim() !== '';
  },
  message: ({path}) => `An empty field was sent in the path ${path.toUpperCase()}`
});