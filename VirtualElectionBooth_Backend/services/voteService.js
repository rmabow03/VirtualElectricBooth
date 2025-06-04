const Candidate = require('../models/Candidate');  

// update vote
const updateVoteCount = async (candidateId) => {
  try {
    const updatedCandidate = await Candidate.findOneAndUpdate(
      { candidateId: candidateId },  
      { $inc: { voteCount: 1 } }, 
      { new: true } 
    );
    return updatedCandidate;
  } catch (error) {
    console.error('Error updating vote count:', error);
    throw error; 
  }
};

module.exports = { updateVoteCount }; 
