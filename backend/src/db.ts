import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Retrieve the database connection details

const pool = new Pool({ // Could've used Client from pg I think
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_PORT),
    ssl: false, // Explicitly disable SSL
});

export default pool;
