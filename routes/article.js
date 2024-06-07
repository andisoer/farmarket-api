import { Router } from 'express';

import { getAll, addArticle, deleteArticle } from '../controller/article_controller.js';
import upload from '../middlewares/upload_middleware.js';

const router = Router();

router.get(
  '/',
  async (req, res) => getAll(req, res),
);
router.post(
  '/',
  upload.single('image'),
  addArticle,
);
router.delete(
  '/:articleId',
  async (req, res) => deleteArticle(req, res),
);

export default router;
