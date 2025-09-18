import mongoose from 'mongoose';
import { developerSchema } from './Developer.js';

const gameSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String, 
    required: true
  },
  price: {
    type: Number
  },
  developer: {
    type: developerSchema,
    ref: 'developers',
    required: [true, 'Path `developer` is required.']
  }
}, {versionKey: false});

const game = mongoose.model('games', gameSchema);

export default game;