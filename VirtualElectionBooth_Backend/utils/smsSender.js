
require('dotenv').config();

function sendSMSMock(phone, otp) {
  console.log(`🔔 [MOCK SMS] Sent OTP ${otp} to ${phone}`);
  return true;
}

function sendSMSReal(phone, otp) {
  // Replace this with real SMS provider API later
  throw new Error("SMS sending not implemented.");
}

function sendSMS(phone, otp) {
  if (process.env.USE_SMS === 'true') {
    return sendSMSReal(phone, otp);
  } else {
    return sendSMSMock(phone, otp);
  }
}

module.exports = { sendSMS };
