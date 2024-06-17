import pkg from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { result } from '../services/helper.js';

import { insertUser, findUserByEmail } from '../models/user_model.js';
import { generateToken } from '../services/jwt.js';

const { hash, compare } = pkg;

export async function register(request, res) {
  try {
    const { name, email, password } = request.body;

    const id = uuidv4();

    if (!name || !email || !password) {
      const response = {
        success: false,
        message: 'Please fill all required fields',
      };
      return result(res, response, 401);
    }

    const userExists = await findUserByEmail(email);
    if (userExists[0]) {
      const response = { success: false, message: 'Email already taken' };
      return result(res, response, 401);
    }

    const hashedPassword = await hash(password, 10);

    await insertUser(id, name, email, hashedPassword);

    const response = { success: true, message: 'Register success' };

    return result(res, response, 201);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: 'Register failed' };
    return result(res, response, 500);
  }
}

export async function login(request, res) {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      const response = {
        success: false,
        message: 'Please fill all required fields',
      };
      return result(res, response, 401);
    }

    const user = await findUserByEmail(email);
    if (!user[0]) {
      const response = { success: false, message: 'Account not found!' };
      return result(res, response, 404);
    }
    const isPasswordValid = await compare(password, user[0].password);
    if (!isPasswordValid) {
      const response = { success: false, message: 'Invalid email / password!' };
      return result(res, response, 401);
    }

    const token = generateToken(user);

    const response = {
      success: true,
      message: 'Login success',
      data: { user, token },
    };

    return result(res, response, 201);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: 'Login failed' };
    return result(res, response, 500);
  }
}

export default {
  register,
  login,
};
