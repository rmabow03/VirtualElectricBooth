// const mongoose = require('mongoose');
// const fs = require('fs');
// const csv = require('csv-parser');
// const User = require('./models/User');
// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('✅ Connected to MongoDB');
//     importCSV();
//   })
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// function importCSV() {
//   const results = [];

//   fs.createReadStream('voters.csv')
//     .pipe(csv())
//     .on('data', (data) => {
//       // แปลง string เป็น boolean
//       data.hasVoted = data.hasVoted === 'true';
//       results.push(data);
//     })
//     .on('end', async () => {
//       for (const userData of results) {
//         await User.updateOne(
//           { thaiId: userData.thaiId },
//           { $set: userData },
//           { upsert: true }
//         );
//         console.log(`✅ Upserted: ${userData.thaiId}`);
//       }
//       mongoose.disconnect();
//       console.log('🚪 Done and disconnected');
//     });
// }