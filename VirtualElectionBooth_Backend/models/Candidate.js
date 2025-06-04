const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  party: { type: String },
  bio: { type: String },
  voteCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Candidate', candidateSchema);
