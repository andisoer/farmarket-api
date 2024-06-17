import { Router } from 'express';

/* Register. */
import { register, login } from '../controller/authentication_controller.js';

const router = Router();

router.post(
  '/register',
  async (req, res) => register(req, res),
);
router.post(
  '/login',
  async (req, res) => login(req, res),
);

export default router;
