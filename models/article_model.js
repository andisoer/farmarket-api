const db = require('../config/database');

const insertArticle = async (id, title, description) => {
    const query = 'INSERT INTO articles (id, title, description) VALUES (?, ?, ?)';
    await db.query(query, [id, title, description])
}

const readArticle = async (offset, limit) => {
    const query = `SELECT id, title, description, image_url, created_at FROM articles LIMIT ${offset},${limit}`;
    return await db.query(query);
}

module.exports = { insertArticle, readArticle };