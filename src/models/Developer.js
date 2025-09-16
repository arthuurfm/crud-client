import mongoose from 'mongoose';

const developerSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  name: {type: String, required: true},
  origin: {type: String}
}, {vesionKey: false});

const developer = mongoose.model('developers', developerSchema);

export {developer, developerSchema};