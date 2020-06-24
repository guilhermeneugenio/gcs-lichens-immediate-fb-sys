// Imports
var express = require('express');
var router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: 'uploads/', limits: { fieldSize: 25 * 1024 * 1024 } })

const surveyExtension = require('../extension/surveysExtension');

router.post('/', async (req, res) => {
    surveyExtension.getForm(req, res);
});

router.post('/submit', async (req, res) => {
    surveyExtension.submitForm(req, res);
});

router.post('/answer', async (req, res) => {
    surveyExtension.processAnswer(req, res);
});

router.post('/answerPhoto', upload.single(), async (req, res) => {
    surveyExtension.processPhoto(req, res);
});


router.post('/feedback', async (req, res) => {
    surveyExtension.returnFeedback(req, res);
});

// Export router
module.exports = router;