import express from 'express';
import {
  getProfile,
  updateProfile,
  endorseSkill
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfile);
router.put('/', updateProfile);
router.patch('/endorse/:skillId', endorseSkill);

export default router;
