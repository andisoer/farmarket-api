const db = require('../config/database.js');
const helper = require('../services/helper');
const config = require('../services/config');

const { insertVegetable, readVegetable } = require('../models/vegetable_model');

const { v4: uuidv4 } = require('uuid');

async function getAll(req, res) {
    const page = req.query.page;
    const limit = req.query.limit;

    const offset = helper.getOffset(page, limit);

    const rows = await readVegetable(offset, limit)
    const data = helper.emptyOrRows(rows);

    const meta = { page };

    const response = { 'success': true, data, meta }

    return helper.response(res, response, 401);
}

async function addVegetable(request, res) {
    try {
        const { name, price, unit, unit_total, description } = request.body;

        // const image = req.file ? req.file.filename : null;
        const id = uuidv4();

        if (!name || !price || !unit || !unit_total || !description) {
            const response = { 'success': false, 'message': 'Please fill all required fields' }
            return helper.response(res, response, 401);
        }

        const validUnits = ['gr', 'pcs', 'kg'];
        if (!validUnits.includes(unit)) {
            const response = { 'success': false, 'message': 'Unit must be one of gr, pcs, or kg' }
            return helper.response(res, response, 401);
        }

        // const query = 'INSERT INTO vegetables (id, name, price, unit, unit_total, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await insertVegetable(id, name, price, unit, unit_total, description);

        const response = { 'success': true, 'message': 'Success add vegetable' }

        return helper.response(res, response, 201);

    } catch (error) {
        console.log(`error ${error}`);

        const response = { 'success': false, 'message': 'Failed add vegetables' }
        return helper.response(res, response, 500);
    }
}

module.exports = {
    getAll, addVegetable
}