const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voteToken: { type: String, required: true },
  hashedThaiId: { type: String, required: true }, 
  candidateId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vote', voteSchema);
