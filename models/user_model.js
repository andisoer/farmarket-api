import db from "../config/database.js";

export const insertUser = async (id, name, email, hashedPassword) => {
  const query =
    "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";
  await db.query(query, [id, name, email, hashedPassword]);
};

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const rows = await db.query(query, [email]);
  return rows;
};

export default { insertUser, findUserByEmail };
