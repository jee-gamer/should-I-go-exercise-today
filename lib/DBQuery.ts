import {Pool, RowDataPacket} from "mysql2/promise";
import pool from "@/lib/dbPool";
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

    private constructor() {
    }

    static getInstance() {
        if (!DBQuery.instance) {
            DBQuery.instance = new DBQuery();
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

    async getField(time: string, field: string): Promise<{
        field?: string,
        result?: number[],
        error_message?: string
    }> {
        let q = `SELECT ${field}, timestamp FROM yearProject`;
        if (INTERVAL[time]) {
            q += ` WHERE TIME(timestamp) BETWEEN '${INTERVAL[time].first}' AND '${INTERVAL[time].last}'`
        }
        q += ";";
        try {
            const [result] = await pool.query<Schema[]>(q);
            return {field: field, result: result.map(n => n.people)};
        } catch (error) {
            return {error_message: error}
        }
    }
}


export default DBQuery.getInstance();