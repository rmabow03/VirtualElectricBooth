require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  USE_SMS: process.env.USE_SMS === 'true',
  TWILIO_SID: process.env.TWILIO_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE: process.env.TWILIO_PHONE,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
};
