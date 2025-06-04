const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');  

// Route to get all candidates
router.get('/candidates', candidateController.getCandidates);

module.exports = router;
