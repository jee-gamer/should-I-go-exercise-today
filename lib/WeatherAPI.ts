import {INTERVAL} from "@/lib/INTERVAL";

class WeatherAPI {
    private static instance: WeatherAPI;
    private readonly key: string;
    private readonly baseURL: string;

    private constructor(key: string, baseURL: string) {
        this.key = key;
        this.baseURL = baseURL;
    }

    static getInstance(apiKey: string, baseURL: string) {
        if(!WeatherAPI.instance) {
            WeatherAPI.instance = new WeatherAPI(apiKey, baseURL);
        }
        return WeatherAPI.instance;
    }

    async fetchData(
        time?: string,
        lat?: string,
        lon?: string
        ) {
        const now = new Date(new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}));
        let hour: number;
        if (!time) {
            hour = now.getHours();
        } else if (INTERVAL[time]) {
            hour = INTERVAL[time].rep;
        } if (hour > 17 || hour < 7) {
            return null;
        } if (!lat) {
            lat = 13.833.toString();
        } if (!lon) {
            lon = 100.483.toString();
        }
        const url = `${this.baseURL}?key=${this.key}&q=${lat},${lon}&aqi=yes&hour=${hour}`
        let res: Response;
        let json: any;
        try {
            res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            json = await res.json();
        } catch (error) {
            return null;
        }
        return json.forecast.forecastday[0].hour[0];
    }
}


const key: string = process.env.API_KEY;
const baseURL: string = "http://api.weatherapi.com/v1/forecast.json";
if (!key) {
    throw new Error("No API_KEY variable defined in .env.local file")
}
export default WeatherAPI.getInstance(key, baseURL);