import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

interface Payload {
  user: {
    id: number;
  };
}

const createToken = user => {
  if (!user && !user.id) {
    return null;
  }

  const payload = {
    user: {
      id: user.id
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = token => {
  return jwt.verify(token, <string>process.env.JWT_SECRET);
};

const getTokenFromHeaders = async (req: Request): Promise<Payload | null> => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const user = verifyToken(token);
      return user;
    } catch (err) {
      return null;
    }
  }

  return null;
};

export const JwtService = {
  createToken,
  getTokenFromHeaders
};
