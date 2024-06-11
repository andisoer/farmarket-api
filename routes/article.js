import { Router } from 'express';

// const multer = require('multer');
import { getAll, addArticle, deleteArticle } from '../controller/article_controller.js';

const router = Router();

// Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Directory to save uploaded files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // File name
//     }
// });
// const upload = multer({ storage: storage });

router.get(
  '/',
  async (req, res) => getAll(req, res),
);
router.post(
  '/',
  async (req, res) => addArticle(req, res),
);
router.delete(
  '/:articleId',
  async (req, res) => deleteArticle(req, res),
);

export default router;
