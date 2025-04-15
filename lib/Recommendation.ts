import {Pool} from "mysql2";
import connector from "@/lib/DBConnector"
import {INTERVAL} from "@/lib/INTERVAL";

class Recommendation {
    private static instance: Recommendation | null = null;
    private pool: Pool;
    private key: string;

    private constructor(dbPool: Pool, key: string) {
        this.pool = dbPool
        this.key = key
    }

    public static getInstance(dbPool: Pool, apiKey: string) {
        if (!Recommendation.instance) {
            Recommendation.instance = new Recommendation(dbPool, apiKey);
        }
        return Recommendation.instance;
    }

    public async suggestion(
        time: string,
        lat: number,
        lon: number
    ): Promise<{
        suggestion: string,
        description: string
    }> {
        let result = {
            suggestion: "unavailable",
            description: "unavailable"
        }
        time = time.toLowerCase();
        const now = new Date(new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}));
        let hour: number;
        if (time === "now") {
            hour = now.getHours();
        } else if (INTERVAL[time]) {
            hour = INTERVAL[time].rep;
        }
        if (hour > 17 || hour < 7) {
            return result;
        }
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${this.key}&q=${lat},${lon}&aqi=yes&hour=${hour}`
        let res: Response;
        let json: any;
        try {
            res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            json = await res.json();
        } catch (error) {
            console.error(error.message);
            return result;
        }
        const hourForecast = json.forecast.forecastday[0].hour[0];
        result.suggestion = "No";
        if (hourForecast.precip_mm >= 1) {
            result.description = "It's raining outside, better stay indoor!";
            return result;
        }
        if (hourForecast.temp_c > 34) {
            result.description = "It's too hot outside, stay indoor or you will melt!";
            return result;
        }
        if (hourForecast.temp_c < 10) {
            result.description = "It's cold outside, you might be frozen if you go outdoor!";
            return result;
        }
        if (29 <= hourForecast.temp_c && hourForecast.temp_c <= 34) {
            result.description = "Pretty hot outside, if you really want to go outdoor, stay hydrated.";
            result.suggestion = "Maybe";
            return result;
        }
        if (hourForecast.humidity > 70) {
            result.description = "Very humid, might feel sticky and uncomfortable.";
            result.suggestion = "Maybe";
            return result;
        }
        if (hourForecast.humidity < 25) {
            result.description = "Too dry outside, may cause dry skin or irritation.";
            result.suggestion = "Maybe";
            return result;
        }
        if (10 <= hourForecast.temp_c &&
            hourForecast.temp_c < 29 &&
            30 <= hourForecast.humidity &&
            hourForecast.humidity <= 60 &&
            hourForecast.precip_mm <= 0.5) {
            result.description = "Outside is in good condition, go ahead and enjoy!";
            result.suggestion = "Yes";
            return result;
        }
        result.description = "Weather outside is not in good condition but still manageable, consider this before going outdoor.";
        result.suggestion = "Maybe";
        return result;
    }

    public recommendTemp() {

    }

    public recommendHumidity() {

    }

    public recommendPrecip() {

    }

    public recommendPM25() {

    }
}


const pool: Pool = connector.createPool();
const key: string = process.env.API_KEY;
export default Recommendation.getInstance(pool, key);