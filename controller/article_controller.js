const db = require("../config/database.js");
const helper = require("../services/helper");
const config = require("../services/config");

const {
  insertArticle,
  readArticle,
  removeArticle,
} = require("../models/article_model");

const { v4: uuidv4 } = require("uuid");

async function getAll(req, res) {
  const page = req.query.page;
  const limit = req.query.limit;

  const offset = helper.getOffset(page, limit);

  const rows = await readArticle(offset, limit);
  const data = helper.emptyOrRows(rows);

  const meta = { page };

  const response = { success: true, data, meta };

  return helper.response(res, response, 200);
}

async function addArticle(request, res) {
  try {
    const { title, description } = request.body;

    const id = uuidv4();

    if (!title || !description) {
      const response = {
        success: false,
        message: "Please fill all required fields",
      };
      return helper.response(res, response, 401);
    }

    await insertArticle(id, title, description);

    const response = { success: true, message: "Success add article" };

    return helper.response(res, response, 201);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: "Failed add article" };
    return helper.response(res, response, 500);
  }
}

async function deleteArticle(request, res) {
  try {
    const id = request.params.articleId;

    console.log(`${request.params}`);

    console.log(`article id ${id}`);

    await removeArticle(id);

    const response = { success: true, message: "Success delete article" };

    return helper.response(res, response, 200);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: "Failed delete article" };
    return helper.response(res, response, 500);
  }
}

module.exports = {
  getAll,
  addArticle,
  deleteArticle,
};
