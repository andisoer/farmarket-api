const db = require('../config/database.js');
const helper = require('../services/helper');
const config = require('../services/config');

const { insertVegetable } = require('../models/vegetable_model');

const { v4: uuidv4 } = require('uuid');

async function getAll(page = 1, limit = 10) {
    const offset = helper.getOffset(page, limit);
    const rows = await db.query(
        `SELECT id, name, price, unit, unit_total FROM vegetables LIMIT ${offset},${limit}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        'success': true,
        data,
        meta
    }
}

async function addVegetable(request, res, next) {
    try {
        const { name, price, unit, unit_total, description } = request.body;

        // const image = req.file ? req.file.filename : null;
        const id = uuidv4();

        if (!name || !price || !unit || !unit_total || !description) {
            const response = { 'success': false, 'message': 'Please fill all required fields' }
            return helper.response(res, response, next, 401);
        }

        const validUnits = ['gr', 'pcs', 'kg'];
        if (!validUnits.includes(unit)) {
            const response = { 'success': false, 'message': 'Unit must be one of gr, pcs, or kg' }
            return helper.response(res, response, next, 401);
        }

        // const query = 'INSERT INTO vegetables (id, name, price, unit, unit_total, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await insertVegetable(id, name, price, unit, unit_total, description);

        const response = { 'success': true, 'message': 'Success add vegetable' }

        return helper.response(res, response, next, 201);

    } catch (error) {
        console.log(`error ${error}`);

        const response = { 'success': false, 'message': 'Failed add vegetables' }
        return helper.response(res, response, next, 500);
    }
}

module.exports = {
    getAll, addVegetable
}