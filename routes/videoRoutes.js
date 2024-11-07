const express = require('express');
const multer = require('multer');
const { processVideo } = require('../controllers/videoController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory to save uploaded files

router.post('/process-video', upload.fields([{ name: 'video' }, { name: 'captionFile' }]), processVideo);

module.exports = router;
