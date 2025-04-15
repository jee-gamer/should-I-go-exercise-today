import mysql from 'mysql2'

class DBConnector {
    private static instance: null | DBConnector = null;
    // Pool used to query using SQL syntax.
    private pool: null | mysql.Pool = null;

    private constructor() {
    }

    public static getInstance(): DBConnector {
        if (!DBConnector.instance) {
            DBConnector.instance = new DBConnector();
        }
        return DBConnector.instance;
    }

    public createPool(): void{
        if (this.pool) {
            console.log("Already have pool created.");
            return;
        }
        try {
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


const db = DBConnector.getInstance();
db.createPool()
export default db.getPool()