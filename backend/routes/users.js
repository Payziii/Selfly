import express from 'express';
import { createUserController } from '../controllers/usersController.js';

const router = express.Router();

router.post('/', createUserController);

export default router;