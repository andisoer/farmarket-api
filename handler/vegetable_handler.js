const db = require('../services/db.js');
const helper = require('../services/helper');
const config = require('../services/config');

const { v4: uuidv4 } = require('uuid');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, name, price, unit, unit_total FROM vegetables LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        'success': true,
        data,
        meta
    }
}

async function insertVegetable(request) {
    const { name, price, unit, unit_total, description } = request.body;

    // const image = req.file ? req.file.filename : null;
    const id = uuidv4();

    if (!name || !price || !unit || !unit_total || !description) {
        return { 'success': false, 'message': 'Please fill all required fields' }
    }

    // const query = 'INSERT INTO vegetables (id, name, price, unit, unit_total, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const query = 'INSERT INTO vegetables (id, name, price, unit, unit_total, description) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [id, name, price, unit, unit_total, image, description], (err, result) => {
        if (err) throw err;

        return { 'success': true, 'message': "Sayur berhasil ditambahkan" }
    });
}

module.exports = {
    getAll, insertVegetable
}