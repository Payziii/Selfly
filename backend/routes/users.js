import express from 'express';
import { createNewUser, changeBio, getUser } from '../controllers/usersController.js';

const router = express.Router();

router.post('/', createNewUser);
router.patch('/bio', changeBio);
router.get('/id/:user_id', getUser);
router.get('/username/:username', getUser);

export default router;