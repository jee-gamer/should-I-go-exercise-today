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
let dbPool: Pool;
try {
    // Pool used to query using SQL syntax.
    dbPool = createPool(dbConfig);
    console.log('Pool created');
} catch (error) {
    console.error('Error creating pool:', error);
}
export default dbPool;