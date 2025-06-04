
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const Otp = require('../models/Otp');  

// request OTP
exports.requestOtp = async (req, res) => {
  // console.log('🔥 [DEBUG] requestOtp called'); //check debug
  const { thaiId } = req.body;
  // console.log('🟢 [DEBUG] Received thaiId:', thaiId); //check debug
  const user = await User.findOne({ thaiId });
  // console.log('👀 [DEBUG] user result:', user); //check debug
  if (!user) {
    return res.status(404).json({ message: 'Thai ID not found' });
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    // console.log('🟠 [DEBUG] Deleting old OTP...'); //check debug
    await Otp.deleteMany({ thaiId });  // ลบของเก่า
    // console.log('🟢 [DEBUG] Inserting new OTP:', otpCode); //check debud
    await Otp.create({ thaiId, otp: otpCode, expiresAt });  // save data
    // console.log('✅ [DEBUG] OTP saved successfully!');
    console.log(`Mock OTP Sent to ${user.phone}: ${otpCode}`);
    return res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error generating OTP:', error);
    // console.error('❌ [DEBUG] Error while saving OTP:', error);
    return res.status(500).json({ message: 'Error generating OTP' });
  }
};


// verify OTP
exports.verifyOtp = async (req, res) => {
  const { thaiId, otp } = req.body;

  try {
    const record = await Otp.findOne({ thaiId, otp });

    if (!record) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: record._id });  //delete expire OTP
      return res.status(400).json({ message: 'OTP expired' });
    }

    await Otp.deleteOne({ _id: record._id });  //delete OTP when verify

    const token = jwt.sign({ thaiId }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });

    return res.json({
      message: 'Authentication successful',
      token,
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Error verifying OTP' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
