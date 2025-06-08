const express = require('express');

const { fileUploadController } = require('../controllers/fileUploadController');

const router = express.Router();


router.post('/upload-to-drive',fileUploadController);

const fileUploadRouter= router;
module.exports = fileUploadRouter;




// const express = require('express');
// const multer = require('multer');

// const router = express.Router();


// router.post('/', upload.single('file'), (req, res) => {
//     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//     // Get file buffer and generate SHA-3 hash
//     const fileHash = generateFileHash(req.file.buffer);

//     res.json({ message: 'File received', fileName: req.file.originalname, fileHash });
// });

// module.exports = router;