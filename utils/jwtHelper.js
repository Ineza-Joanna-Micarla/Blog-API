import jwt from 'jsonwebtoken';
import config from 'config';

export const generateToken = (payload) => {
  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });
};