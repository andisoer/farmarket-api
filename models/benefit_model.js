const db = require('../config/database');

const insertBenefit = async (id, name) => {
    const query = 'INSERT INTO benefits (id, benefit) VALUES (?, ?)';
    await db.query(query, [id, name])
}

const readBenefit = async (offset, limit) => {
    const query = `SELECT id, benefit FROM benefits LIMIT ${offset},${limit}`;
    return await db.query(query);
}


module.exports = { insertBenefit, readBenefit };