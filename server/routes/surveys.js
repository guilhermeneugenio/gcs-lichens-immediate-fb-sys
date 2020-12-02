/* 
 * surveys (Router)
 * Description : Contains all the endpoints that handle requests
 * related to the surveys. Allows to get surveys, answer them,
 * get feedback, submit new surveys and get additional info from
 * the system.
 */

// Imports
var express = require('express');
var router = express.Router();
var feedback = require('../modules/feedback');

// Import survey extension functions
const surveyExtension = require('../extension/surveysExtension');

// Used to allow multipart request used to send images between app/client and server
var multer  = require('multer')
var upload = multer({ limits: { fieldSize: 25 * 1024 * 1024 } })

// Get a survey
router.post('/', async (req, res) => {
    var dynamicRes = await surveyExtension.dynamicSurvey(req, res);
    surveyExtension.staticSurvey(req, res, dynamicRes);
});

// Submit a new survey to the server
router.post('/submit', async (req, res) => {
    surveyExtension.submitSurvey(req, res);
});

// Submit survey answer
router.post('/answer', async (req, res) => {
    surveyExtension.processAnswer(req, res);
});

// Submit image as (part of) survey answer
router.post('/answerImage', upload.single(), async (req, res) => {
    surveyExtension.processImage(req, res);
});

// Get feedback of an answer
router.post('/feedback', async (req, res) => {
    feedback.differenciated(req, res);
    feedback.immediate(req, res);
});

// Get info to help answer survey
router.post('/getData', async (req, res) => {
    surveyExtension.getData(req, res);
});

// Removes data from the answers
router.post('/removeData', async (req, res) => {
    surveyExtension.removeData(req, res);
});

// Export router
module.exports = router;