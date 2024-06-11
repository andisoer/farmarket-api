import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const secret = "your_jwt_secret"; // Use a strong secret in production

export const generateToken = (user) => {
  return sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "12h",
  });
};

export const verifyToken = (token) => {
  return verify(token, secret);
};

export default {
  generateToken,
  verifyToken,
};
