import { Router } from 'express';

import { createVegetableTransaction, getAll, getById } from '../controller/transaction_controller.js';

const router = Router();

router.post(
  '/',
  async (req, res) => createVegetableTransaction(req, res),
);

router.get(
  '/:transactionId',
  async (req, res) => getById(req, res),
);

router.get(
  '/',
  async (req, res) => getAll(req, res),
);
export default router;
