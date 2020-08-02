// Imports
var express = require('express');
var router = express.Router();

const resultsExtension = require('../extension/resultsExtension');

router.post('/getData', async (req, res) => {
    resultsExtension.getData(req, res);
});

/*
router.post('/editData', async (req, res) => {
    resultsExtension.editData(req, res);
});

router.post('/removeData', async (req, res) => {
    resultsExtension.removeData(req, res);
});

router.post('/validateData', async (req, res) => {
    resultsExtension.validateData(req, res);
});
*/

// Export router
module.exports = router;