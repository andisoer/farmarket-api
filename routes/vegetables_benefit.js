import { Router } from 'express';
import { addVegetableBenefit } from '../controller/vegetable_benefit_controller.js';

const router = Router();

router.post(
  '/',
  addVegetableBenefit,
);

export default router;
