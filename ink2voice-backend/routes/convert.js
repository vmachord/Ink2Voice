const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const convertController = require('../controllers/convertController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), convertController.convertInk);

module.exports = router;
