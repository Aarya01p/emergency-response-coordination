import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';
import { Logger } from '../utils/logger';

dotenv.config();

const logger = new Logger('Database');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'emergency_user',
  password: process.env.DB_PASSWORD || 'emergency_password',
  database: process.env.DB_NAME || 'emergency_response_db',
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
});

export async function connectDatabase(): Promise<void> {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    logger.info('Database connected successfully');
    client.release();
  } catch (err) {
    logger.error('Database connection failed:', err);
    throw err;
  }
}

export function getPool(): Pool {
  return pool;
}

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug(`Query executed in ${duration}ms`);
    return result;
  } catch (err) {
    logger.error('Query error:', err);
    throw err;
  }
}

export async function getClient(): Promise<PoolClient> {
  return await pool.connect();
}
