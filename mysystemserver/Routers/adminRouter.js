const express = require('express');
const adminUploadController = require('../controllers/adminController');
const multer = require('multer');
const storage = multer.memoryStorage(); // or use diskStorage if saving to disk
const upload = multer({ storage });


const route = express.Router();


route.post('/upload', upload.fields([
  { name: 'original', maxCount: 1 },
  { name: 'reference', maxCount: 1 }
]),adminUploadController);


const AdminRouter = route;
module.exports = AdminRouter;