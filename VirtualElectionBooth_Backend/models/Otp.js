const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  thaiId: { type: String, required: true },          
  otp: { type: String, required: true },             
  createdAt: { type: Date, default: Date.now },      
  expiresAt: { type: Date, required: true }         
});

module.exports = mongoose.model('Otp', otpSchema);
