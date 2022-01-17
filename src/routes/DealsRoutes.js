import express from 'express';
import dealsController from '../controller/DealsController.js'

const router = express.Router();

router.get('/publish', dealsController.publish.bind(dealsController));
router.get('/list', dealsController.list.bind(dealsController));

export default router;
