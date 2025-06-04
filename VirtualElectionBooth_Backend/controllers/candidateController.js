
const Candidate = require('../models/Candidate');  

//pull candidate data
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลผู้สมัครได้' });
  }
};
