// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET; 

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log('Auth Header:', authHeader);
  
//   if (!authHeader) {
//     return res.status(401).json({ message: 'Authorization header missing' });
//   }
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized, no token provided' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;  // เก็บข้อมูลผู้ใช้ที่ decode ไว้ใน req.user
//     next();  // ถ้า JWT ถูกต้อง, ให้ดำเนินการกับ route ต่อไป
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// check middleware token
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;  //pull token form cookie 

  if (!token) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  try {
    //check token it's right 
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  
    next();  
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
