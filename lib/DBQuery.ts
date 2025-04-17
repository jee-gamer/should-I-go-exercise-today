import {Pool, RowDataPacket} from "mysql2";
import DBConnector from "@/lib/DBConnector";
import {INTERVAL} from "@/lib/INTERVAL";

interface Schema extends RowDataPacket{
    id: number;
    timestamp: Date;
    light: number;
    temperature: number;
    humidity: number;
    people: number;
    precip_mm: number;
    PM25: number;
}

class DBQuery {
    private static instance: DBQuery;
    private readonly pool: Pool;

    private constructor(dbPool: Pool) {
        this.pool = dbPool;
    }

    static getInstance(dbPool: Pool) {
        if (!DBQuery.instance) {
            DBQuery.instance = new DBQuery(dbPool);
        }
        return DBQuery.instance
    }

    static mapInterval() {
        const now = new Date(new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'})).getHours();
        return (7 <= now) && (now < 9) ? "dawn" :
            (9 <= now) && (now < 11) ? "morning" :
                (11 <= now) && (now < 13) ? "noon" :
                    (13 <= now) && (now < 15) ? "afternoon" :
                        (15 <= now) && (now < 17) ? "late-afternoon" :
                            null
    }

    async getAllPeople(time: string): Promise<{
        people: number[]
    }> {
        let q = "SELECT people, timestamp FROM yearProject";
        if (INTERVAL[time]) {
            q += ` WHERE TIME(timestamp) BETWEEN '${INTERVAL[time].first}' AND '${INTERVAL[time].last}'`
        }
        q += ";";
        const [result] = await this.pool.promise().query<Schema[]>(q);
        return {people: result.map(n => n.people)};
    }
}


const pool: Pool = DBConnector.getPool();
export default DBQuery.getInstance(pool);