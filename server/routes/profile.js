// Imports
var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ limits: { fieldSize: 25 * 1024 * 1024 } })

const profileExtension = require('../extension/profileExtension');

router.post('/', async (req, res) => {
    profileExtension.getProfile(req, res);
});

router.post('/edit', upload.single(), async (req, res) => {
    profileExtension.editProfile(req, res);
});

// Export router
module.exports = router;