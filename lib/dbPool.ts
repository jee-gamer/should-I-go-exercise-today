import {Pool, createPool} from 'mysql2/promise'


// You can config database via .env.local file, read example.env for more
const dbConfig = {
    host: process.env.DB_SERVER as string,
    database: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0,
};

let globalPool = global as typeof globalThis & {
    pool?: Pool;
};

const dbPool: Pool =
    globalPool.pool ||
    createPool(dbConfig).on('connection', () => {
        console.log("Pool created");
    });

if (!globalPool.pool) globalPool.pool = dbPool;

export default dbPool;

process.on('SIGINT', async () => {
    console.log('Gracefully shutting down MySQL pool (SIGINT)');
    await dbPool.end();
    process.exit();
});

process.on('SIGTERM', async () => {
    console.log('Gracefully shutting down MySQL pool (SIGTERM)');
    await dbPool.end();
    process.exit();
});