import { Router } from 'express';
import { getAll, addVegetable } from '../controller/vegetable_controller.js';
import upload from '../middlewares/upload_middleware.js';

const router = Router();

router.get(
  '/',
  async (req, res) => getAll(req, res),
);
router.post(
  '/',
  upload.single('image'),
  addVegetable,
);

export default router;
