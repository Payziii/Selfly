import express from 'express';
import { createNewUser, changeBio } from '../controllers/usersController.js';

const router = express.Router();

router.post('/', createNewUser);
router.patch('/bio', changeBio);

export default router;