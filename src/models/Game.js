import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  title: {type: String, required: true},
  developer: {type: String},
  price: {type: Number}
}, {versionKey: false});

const game = mongoose.model('games', gameSchema);

export default game;