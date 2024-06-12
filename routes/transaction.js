import { Router } from 'express';

import { createVegetableTransaction } from '../controller/transaction_controller.js';

const router = Router();

router.post(
  '/',
  async (req, res) => createVegetableTransaction(req, res),
);
export default router;
