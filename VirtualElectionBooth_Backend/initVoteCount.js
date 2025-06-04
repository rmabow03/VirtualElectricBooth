const mongoose = require('mongoose');
const Candidate = require('./models/Candidate'); 

// connect database
mongoose.connect('mongodb://localhost:27017/VirtualEletricBooth')
  .then(() => {
    console.log('✅ เชื่อมต่อฐานข้อมูลแล้ว');
    return Candidate.updateMany(
      { voteCount: { $exists: false } },
      { $set: { voteCount: 0 } }
    );
  })
  .then(result => {
    console.log('🎯 อัปเดต voteCount สำเร็จ:', result.modifiedCount);
  })
  .catch(err => {
    console.error('❌ เกิดข้อผิดพลาด:', err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
