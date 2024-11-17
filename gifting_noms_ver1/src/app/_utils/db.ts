import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined, // Convert port to number,
});

export async function query(queryText, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(queryText, params);
    return res;
  } finally {
    client.release();
  }
}
