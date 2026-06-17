import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { register, login, getUserProfile, deleteAccount } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user',protect, getUserProfile);
router.delete('/delete-account', protect, deleteAccount)

export default router;
