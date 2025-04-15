import * as sql from 'mssql'

class DBConnector {
    private static instance: null | DBConnector = null;
    private connection: null | sql.ConnectionPool = null;

    private constructor() {
    }

    public static getInstance(): DBConnector {
        if (!DBConnector.instance) {
            DBConnector.instance = new DBConnector();
        }
        return DBConnector.instance;
    }

    public async connect(): Promise<void>{
        if (this.connection) {
            console.log("Already connected to database.");
            return;
        }
        try {
            const dbConfig = {
                server: process.env.DB_SERVER as string,
                database: process.env.DB_NAME as string,
                user: process.env.DB_USER as string,
                password: process.env.DB_PASSWORD as string,
                port: process.env.DB_PORT as unknown as number,
                options: {
                    encrypt: true,
                    enableArithAbort: true
                }
            };
            this.connection = await sql.connect(dbConfig);
            console.log('Connected to SQL Server');
        } catch (error) {
            console.error('Error connecting to SQL Server:', error);
        }
    }
}


export default DBConnector.getInstance()