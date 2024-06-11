import { v4 as uuidv4 } from 'uuid';
import { getOffset, emptyOrRows, result } from '../services/helper.js';

import { insertArticle, readArticle, removeArticle } from '../models/article_model.js';

export async function getAll(req, res) {
  const { page } = req.query;
  const { limit } = req.query;

  const offset = getOffset(limit, page);

  const rows = await readArticle(offset, limit);
  const data = emptyOrRows(rows);

  const meta = { page };

  const response = { success: true, data, meta };

  return result(res, response, 200);
}

export async function addArticle(request, res) {
  try {
    const { title, description } = request.body;

    const id = uuidv4();

    if (!title || !description) {
      const response = {
        success: false,
        message: 'Please fill all required fields',
      };
      return result(res, response, 401);
    }

    await insertArticle(id, title, description);

    const response = { success: true, message: 'Success add article' };

    return result(res, response, 201);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: 'Failed add article' };
    return result(res, response, 500);
  }
}

export async function deleteArticle(request, res) {
  try {
    const id = request.params.articleId;

    console.log(`${request.params}`);

    console.log(`article id ${id}`);

    await removeArticle(id);

    const response = { success: true, message: 'Success delete article' };

    return result(res, response, 200);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: 'Failed delete article' };
    return result(res, response, 500);
  }
}

export default {
  getAll,
  addArticle,
  deleteArticle,
};
