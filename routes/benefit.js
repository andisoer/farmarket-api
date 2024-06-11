import { Router } from 'express';

import { getAll, addBenefit } from '../controller/benefit_controller.js';

const router = Router();

router.get(
  '/',
  async (req, res) => getAll(req, res),
);
router.post(
  '/',
  async (req, res) => addBenefit(req, res),
);

export default router;
