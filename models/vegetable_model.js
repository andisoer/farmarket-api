const db = require('../config/database');

const insertVegetable = async (id, name, price, unit, unit_total, description) => {
    const query = 'INSERT INTO vegetables (id, name, price, unit, unit_total, description) VALUES (?, ?, ?, ?, ?, ?)';
    await db.query(query, [id, name, price, unit, unit_total, description])
}

module.exports = { insertVegetable };