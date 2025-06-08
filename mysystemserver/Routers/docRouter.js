const express = require('express');
const { uploadController, downloadController, getDocsNameController } = require('../controllers/docController');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

router.post('/upload', upload.single('file'),uploadController);
router.post('/download',downloadController);
router.get('/get-docs-name/:userId',getDocsNameController);

const DocRouter = router;
module.exports = DocRouter;




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