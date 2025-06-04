const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  thaiId: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  hasVoted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
