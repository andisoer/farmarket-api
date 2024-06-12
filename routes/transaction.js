import { Router } from 'express';

import { createVegetableTransaction, getById } from '../controller/transaction_controller.js';

const router = Router();

router.post(
  '/',
  async (req, res) => createVegetableTransaction(req, res),
);

router.get(
  '/:transactionId',
  async (req, res) => getById(req, res),
);
export default router;
