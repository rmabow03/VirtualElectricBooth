const mongoose = require('mongoose');
const User = require('./models/User'); // Import User model
require('dotenv').config();  // Ensure dotenv is loaded to access environment variables

const addData = async () => {
  const users = [
    { thaiId: '1470401287888', phone: '0993462416', hasVoted: false },
    { thaiId: '3591072442313', phone: '0831596742', hasVoted: false },
    { thaiId: '6273021544821', phone: '0867351284', hasVoted: false },
    { thaiId: '9534018827395', phone: '0804623981', hasVoted: false },
    { thaiId: '2641983775254', phone: '0817492356', hasVoted: false },
    { thaiId: '3972468834102', phone: '0895237401', hasVoted: false },
    { thaiId: '5067431029438', phone: '0887421357', hasVoted: false },
    { thaiId: '8031294455010', phone: '0851934765', hasVoted: false },
    { thaiId: '7283449132497', phone: '0845638712', hasVoted: false },
    { thaiId: '6409127713098', phone: '0829741638', hasVoted: false },
    { thaiId: '2129786342870', phone: '0812947603', hasVoted: false },
    { thaiId: '9301652175417', phone: '0801462857', hasVoted: false },
    { thaiId: '5890213724165', phone: '0894723619', hasVoted: false },
    { thaiId: '4187093553826', phone: '0823186742', hasVoted: false },
    { thaiId: '3012458921708', phone: '0881745936', hasVoted: false },
    { thaiId: '7486135297402', phone: '0869457102', hasVoted: false },
    { thaiId: '5691823047192', phone: '0842361780', hasVoted: false },
    { thaiId: '4829301678415', phone: '0856712493', hasVoted: false },
    { thaiId: '6350984132795', phone: '0875293416', hasVoted: false },
    { thaiId: '9061843271053', phone: '0817534926', hasVoted: false },
    { thaiId: '8537401924861', phone: '0809374521', hasVoted: false },
    { thaiId: '1094852637408', phone: '0882147635', hasVoted: false },
    { thaiId: '7402931852704', phone: '0829415763', hasVoted: false },
    { thaiId: '6247391824501', phone: '0894716532', hasVoted: false },
    { thaiId: '3871029546238', phone: '0862147593', hasVoted: false },
    { thaiId: '8410632901457', phone: '0841057396', hasVoted: false },
    { thaiId: '1705249386209', phone: '0813749286', hasVoted: false },
    { thaiId: '6924810375914', phone: '0832094816', hasVoted: false },
    { thaiId: '2093847152037', phone: '0875362941', hasVoted: false },
    { thaiId: '7942381657049', phone: '0803951748', hasVoted: false },
    { thaiId: '2587102943851', phone: '0857201943', hasVoted: false },
    { thaiId: '1063948205791', phone: '0823059617', hasVoted: false },
    { thaiId: '8421957304698', phone: '0897134259', hasVoted: false },
    { thaiId: '6719528042135', phone: '0882395764', hasVoted: false },
  ];

  // Iterate over each user and upsert (insert or update)
  for (const userData of users) {
    await User.updateOne(
      { thaiId: userData.thaiId }, // Search criteria
      { $set: userData },  // Update the user data
      { upsert: true }      // If not found, insert the new document
    );
    console.log(`User with thaiId ${userData.thaiId} upserted.`);
  }
};

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB Connected');
    addData(); 
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
// for (const userData of users) {
//   await User.updateOne(
//     { thaiId: userData.thaiId },
//     { $set: userData },
//     { upsert: true }
//   );
//   console.log(`✅ User with thaiId ${userData.thaiId} upserted.`);
// }
// };

// mongoose.connection.once('open', async () => {
// console.log('✅ MongoDB fully connected');

// try {
//   await addData();
// } catch (err) {
//   console.error('❌ MongoDB operation error:', err.message);
// } finally {
//   mongoose.connection.close();
// }
// });

// mongoose.connect(process.env.MONGO_URI, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// }).catch((err) => {
// console.error('❌ Initial connection error:', err.message);
// });