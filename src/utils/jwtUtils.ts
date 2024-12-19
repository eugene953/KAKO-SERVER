import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET_KEY } from './env_variable';
dotenv.config();

// Generate a JWT token with user_id
export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

// Middleware authenticate user by verifying the token
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };
    req.body.user_id = decoded.id; // Attach userId to the request body
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
