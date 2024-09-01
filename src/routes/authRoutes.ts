import { Router } from 'express';
import { authController } from '../controllers/authController';

const router = Router();

router.post('/auth/register', authController.register.bind(authController));
router.post('/auth/login', authController.login.bind(authController));

export default router;
