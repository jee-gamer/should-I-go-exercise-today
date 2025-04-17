import mysql from 'mysql2'

class DBConnector {
    private static instance: null | DBConnector = null;
    // Pool used to query using SQL syntax.
    private readonly pool: null | mysql.Pool = null;

    public static getInstance(dbConfig): DBConnector {
        if (!DBConnector.instance) {
            DBConnector.instance = new DBConnector(dbConfig);
        }
        return DBConnector.instance;
    }

    private constructor(dbConfig) {
        try {
            // You can config database via .env.local file, read example.env for more

            this.pool = mysql.createPool(dbConfig);
            console.log('Pool created');
        } catch (error) {
            console.error('Error creating pool:', error);
        }
    }

    public getPool() {
        return this.pool;
    }
}

const dbConfig = {
    host: process.env.DB_SERVER as string,
    database: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0,
};
export default DBConnector.getInstance(dbConfig);