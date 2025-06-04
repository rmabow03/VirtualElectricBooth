const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const Candidate = require('../models/Candidate');
const crypto = require('crypto');

// hase thaiID
function hashIdCard(idCard) {
  return crypto.createHash('sha256').update(idCard).digest('hex');
}

// get for the result 
router.get('/', async (req, res) => {
  try {
    const votes = await Vote.find().populate('candidateId');
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลการโหวต' });
  }
});

router.post('/vote', async (req, res) => {
  const { candidateId, voteToken, thaiId } = req.body;

  if (!candidateId || !voteToken || !thaiId) {
    return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน' });
  }

  try {
    const hashedThaiId = hashIdCard(thaiId);

    //check that this id has used before 
    const existingVote = await Vote.findOne({ hashedThaiId });

    if (existingVote) {
      return res.status(400).json({ message: 'คุณได้ทำการโหวตแล้ว' });
    }

    // save vote
    const newVote = new Vote({
      candidateId,
      voteToken,
      hashedThaiId 
    });

    await newVote.save();

    // update the result in cadidate table
    await Candidate.findOneAndUpdate(
      { candidateId },
      { $inc: { voteCount: 1 } }
    );

    return res.status(200).json({ message: 'โหวตสำเร็จ' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
  }
});

// check token
router.post('/check-token', async (req, res) => {
  const { voteToken, thaiId } = req.body;
  if (!thaiId) return res.status(400).json({ message: 'Thai ID required' });

  const hashedId = hashIdCard(thaiId);  // check hash
  const voted = await Vote.findOne({ hashedThaiId: hashedId });  // check that already vote

  if (voted) return res.json({ voted: true });
  res.json({ voted: false });
});

module.exports = router;
