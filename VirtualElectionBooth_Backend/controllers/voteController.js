const User = require('../models/User');
const Vote = require('../models/Vote');
const Candidate = require('../models/Candidate'); 
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config(); 

const SALT = process.env.HASH_SALT || 'defaultBackupSaltValue'; //salt 

// Hash thaiID 
function hashThaiId(thaiId) {
  return crypto.createHash('sha256').update(thaiId + SALT).digest('hex');
}

// voting function
exports.submitVote = async (req, res) => {
  const thaiId = req.user.thaiId;
  const { candidateId, voteToken } = req.body;

  if (!candidateId || !voteToken) {
    return res.status(400).json({ message: 'Candidate ID and Vote Token are required' });
  }

  try {
    const user = await User.findOne({ thaiId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.hasVoted) return res.status(403).json({ message: 'You have already voted' });

    const thaiIdHashed = hashThaiId(thaiId);
    const existingVote = await Vote.findOne({ voteToken, hashedThaiId: thaiIdHashed });
    if (existingVote) return res.status(400).json({ message: 'This token has already been used to vote' });

    //save vote
    const vote = new Vote({
      hashedThaiId: thaiIdHashed,     
      candidateId,
      voteToken,
      voteTime: Date.now(),
    });
    

    // await Candidate.findOneAndUpdate(
    //   { candidateId },
    //   { $inc: { voteCount: 1 } }
    // );
    // console.log('candidateId from vote:', candidateId); //debug
    const candidate = await Candidate.findOneAndUpdate(
      { candidateId: candidateId },       
      { $inc: { voteCount: 1 } },
      { new: true }
    );
    
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    

    user.hasVoted = true;
    await user.save();

    return res.json({ message: 'Vote submitted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// see the result 
exports.getResults = async (req, res) => {
  try {
    const candidates = await Candidate.find({}, 'candidateId name party voteCount');
    return res.json(candidates); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching results' });
  }
};
