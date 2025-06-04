const config = require('../config/config');

//create random OTP
exports.generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

//simulate sending OTP in console
exports.sendOtp = (phone, otp) => {
  console.log(`[Mock OTP] Sent to ${phone}: ${otp}`);
};



