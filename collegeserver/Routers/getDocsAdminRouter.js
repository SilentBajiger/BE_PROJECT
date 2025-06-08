const express = require('express');

const { getDocsAdminController } = require('../controllers/getDocsAdminController');

const router = express.Router();


router.get('/get-docs',getDocsAdminController);

const getDocsAdminRouter= router;
module.exports = getDocsAdminRouter;
