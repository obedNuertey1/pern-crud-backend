import { config } from "dotenv";
import pg from "pg";
config();

const Pool = pg.Pool;

export default new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false, // Only use this for development, not recommended for production
      },
});