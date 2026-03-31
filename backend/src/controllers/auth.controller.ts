import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '@/models/user.model';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key', {
    expiresIn: '1d',
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const existUser = await UserModel.findOne({ email: req.body.email });

    if (existUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const newUser = await UserModel.create({
      email: req.body.email,
      password: req.body.password,
    });

    const token = signToken(newUser._id.toString());
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: 'Server error.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    } else if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const token = signToken(user._id.toString());
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: 'Server error.' });
  }
};
