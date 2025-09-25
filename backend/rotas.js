import express from 'express';
import safeBrowsingController from './controller/safeBrowsingController.js';

const router = express.Router();

router.post('/check-url', safeBrowsingController.checkUrl);
router.post('/check-multiple-urls', safeBrowsingController.checkMultipleUrls);

export default router;