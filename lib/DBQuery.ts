import {Pool, RowDataPacket} from "mysql2/promise";
import pool from "@/lib/dbPool";
import {INTERVAL} from "@/lib/INTERVAL";

interface Schema extends RowDataPacket {
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

    async getField(field: string, time?: string): Promise<{
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
            return {field: field, result: result.map(n => n[field])};
        } catch (error) {
            return {error_message: error}
        }
    }

    async getFields(fields: string[], time?: string): Promise<{
        fields?: string[],
        result?: number[][],
        error_message?: string
    }> {
        let fieldString: string;
        if (!fields || fields.length == 0) {
            fieldString = "*";
            fields = ["id", "timestamp", "light", "temperature", "humidity", "people", "precip_mm", "PM25"]
        } else {
            fieldString = fields.join(", ") + ", timestamp";
        }
        let q = `SELECT ${fieldString} FROM yearProject`
        if (INTERVAL[time]) {
            q += ` WHERE TIME(timestamp) BETWEEN '${INTERVAL[time].first}' AND '${INTERVAL[time].last}'`
        }
        q += ";";
        try {
            const [result] = await pool.query<Schema[]>(q);
            return {fields: fields, result: result.map(n => fields.map(f => n[f]))};
        } catch (error) {
            return {error_message: error}
        }
    }

    async getMax(fields: string[]) {
        let fieldString: string;
        if (!fields || fields.length == 0) {
            fields = ["light", "temperature", "humidity", "people", "precip_mm", "PM25"]
        }
        fieldString = fields.map(f => `MAX(${f}) AS ${f}`).join(", ");
        try {
            const [result] = await pool.query<Schema[]>(`SELECT ${fieldString} FROM yearProject`);
            const returned = {}
            for (const field of fields) {
                returned[field] = result[0][field];
            }
            return returned;
        } catch (error) {
            return {error_message: error};
        }
    }
}


export default DBQuery.getInstance();