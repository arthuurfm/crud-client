import mongoose from 'mongoose';
import { developerSchema } from './Developer.js';

const gameSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String, 
    required: [true, '`title` is required.']
  },
  price: {
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 0 && value <= 1000;
      },
      message: 'Price: {VALUE}. Price must be between 0 and 1000'
    }
  },
  developer: {
    type: developerSchema,
    ref: 'developers',
    required: [true, '`developer` is required.']
  }
}, {versionKey: false});

const game = mongoose.model('games', gameSchema);

export default game;