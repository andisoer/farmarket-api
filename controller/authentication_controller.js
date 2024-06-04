const helper = require('../services/helper');
const bcrypt = require('bcryptjs');

const { insertUser, findUserByEmail } = require('../models/user_model');

const { v4: uuidv4 } = require('uuid');


async function register(request, res) {
    try {
        const { name, email, password } = request.body;

        const id = uuidv4();

        if (!name || !email || !password) {
            const response = { 'success': false, 'message': 'Please fill all required fields' }
            return helper.response(res, response, 401);
        }

        const userExists = await findUserByEmail(email);
        if (userExists[0]) {
            const response = { 'success': false, 'message': 'Email already taken' }
            return helper.response(res, response, 401);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await insertUser(id, name, email, hashedPassword);

        const response = { 'success': true, 'message': 'Register success' }

        return helper.response(res, response, 201);

    } catch (error) {
        console.log(`error ${error}`);

        const response = { 'success': false, 'message': 'Register failed' }
        return helper.response(res, response, 500);
    }
}


module.exports = {
    register
}