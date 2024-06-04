const db = require('../config/database');

const insertUser = async (id, name, email, hashedPassword) => {
    const query = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';
    await db.query(query, [id, name, email, hashedPassword]);
};

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const rows = await db.query(query, [email]);
    return rows;
};

module.exports = { insertUser, findUserByEmail };