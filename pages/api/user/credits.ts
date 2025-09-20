import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in .env.local');
    return res.status(500).json({ message: 'Server configuration error: JWT secret is missing.' });
  }

  try {
    await dbConnect();

    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.credits > 0) {
      user.credits -= 1;
      await user.save();
      res.status(200).json({ credits: user.credits });
    } else {
      res.status(400).json({ message: 'Insufficient credits' });
    }

  } catch (error: any) {
    console.error('Credits API Error:', error);
    res.status(401).json({ message: 'Invalid token', details: error.message });
  }
}
