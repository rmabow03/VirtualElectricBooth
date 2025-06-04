const Otp = require('../models/Otp');

// random OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// send OTP
exports.sendOtp = async (req, res) => {
    const { thaiId } = req.body;
    if (!thaiId) {
      return res.status(400).json({ message: 'Thai ID is required' });
    }
  
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
  
    try {
      await Otp.deleteMany({ thaiId });  // delete old OTP
      await Otp.create({
        thaiId,
        otp: otpCode,
        expiresAt
      });
  
      console.log(`OTP for ${thaiId}: ${otpCode}`);  // mock
      res.json({ message: 'OTP has been generated and sent (mock)' });
    } catch (error) {
      console.error('Error generating OTP:', error);
      res.status(500).json({ message: 'Error generating OTP' });
    }
  };
  

// verify OTP
exports.verifyOtp = async (req, res) => {
  const { thaiId, otp } = req.body;
  if (!thaiId || !otp) {
    return res.status(400).json({ message: 'Thai ID and OTP are required' });
  }

  try {
    const record = await Otp.findOne({ thaiId, otp });

    if (!record) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // (Optional) ลบ OTP หลังตรวจสอบสำเร็จ:
    await Otp.deleteOne({ _id: record._id });

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};
