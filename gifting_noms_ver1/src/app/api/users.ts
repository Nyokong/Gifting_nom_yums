// pages/api/users.js
import { query } from '../../db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user into the database
      const result = await query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
      );

      const user = result.rows[0];
      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
