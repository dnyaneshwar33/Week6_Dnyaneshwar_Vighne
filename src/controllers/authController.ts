import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerUser, findUserByUsername, findUserById } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  const { username, password, email, isAdmin } = req.body; // Add isAdmin here

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = await registerUser(username, password, email, isAdmin); // Pass isAdmin to registerUser
    res.status(201).json({ id: user.id, username: user.username, email: user.email });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ token,user });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.user!.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ id: user.id, username: user.username, email: user.email });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
