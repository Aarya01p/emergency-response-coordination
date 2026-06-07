import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { Logger } from '../../utils/logger';

const logger = new Logger('Migration');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'emergency_user',
  password: process.env.DB_PASSWORD || 'emergency_password',
  database: process.env.DB_NAME || 'emergency_response_db',
});

async function runMigrations() {
  try {
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    await pool.query(schema);
    logger.info('Database migrations completed successfully');
  } catch (err) {
    logger.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
