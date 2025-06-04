const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,  
  useUnifiedTopology: true, 
  socketTimeoutMS: 60000,  
  serverSelectionTimeoutMS: 60000  
})
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
