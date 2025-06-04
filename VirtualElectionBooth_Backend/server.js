const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');  
const rateLimit = require('express-rate-limit'); 


dotenv.config();


require('./config/database');


const authRoutes = require('./route/authRoutes');
const voteRoutes = require('./route/voteRoutes');
const candidateRoutes = require('./route/candidateRoutes');
const otpRoutes = require('./route/otpRoutes');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', //connect frontend 
  credentials: true, //open cookie
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
};

app.use(cors(corsOptions));  //use cor that we determine

app.use(cookieParser()); 

//protect spam can request otp 3 time in 5 min 
const otpRequestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,   
  max: 3,                    
  message: { message: 'Too many OTP requests, please try again later.' }
});
app.use('/api/auth/request-otp', otpRequestLimiter);

// path determine
app.use('/api/auth', authRoutes);  
app.use('/api/vote', voteRoutes);  
app.use('/api/candidate', candidateRoutes);  
app.use('/api/otp', otpRoutes);

//simulate data
require('./populateData');

//run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
