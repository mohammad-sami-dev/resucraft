import express from 'express'
import protect from '../middleware/authMiddleware.js';
import Cv from '../models/Cv.js';
import { createCv, getAllCvs, getSingleCv, updateCv, deleteCv} from '../controllers/cvController.js'
const router = express.Router();

// save a cv 
router.post('/create', protect, createCv);

// get all cvs
router.get('/all', protect, getAllCvs);

// get a single cv
router.get('/:id', protect, getSingleCv);

// update a cv
router.put('/:id', protect, updateCv);

// delete a cv
router.delete('/:id', protect, deleteCv)


export default router;