import {INTERVAL} from "@/lib/INTERVAL";

class WeatherAPI {
    private static instance: WeatherAPI;
    private readonly key: string;
    private readonly baseURL = "http://api.weatherapi.com/v1/forecast.json"

    private constructor(key: string) {
        this.key = key
    }

    static getInstance() {
        if(!WeatherAPI.instance) {
            const key: string = process.env.API_KEY;
            if (!key) {
                throw new Error("No API_KEY variable defined in .env.local file")
            }
            WeatherAPI.instance = new WeatherAPI(key);
        }
        return WeatherAPI.instance;
    }

    async fetchData(
        time?: string,
        lat?: number,
        lon?: number
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
            lat = 13.833;
        } if (!lon) {
            lon = 100.483;
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

export default WeatherAPI.getInstance()