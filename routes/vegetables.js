import { Router } from 'express';
import {
  getAll, addVegetable, getById, getVegetablesByBenefitIds,
} from '../controller/vegetable_controller.js';
import upload from '../middlewares/upload_middleware.js';

const router = Router();

router.get(
  '/',
  async (req, res) => getAll(req, res),
);

router.get(
  '/:vegetableId',
  async (req, res) => getById(req, res),
);

router.post(
  '/',
  upload.single('image'),
  addVegetable,
);

router.post(
  '/recommendation',
  async (req, res) => getVegetablesByBenefitIds(req, res),
);

export default router;
