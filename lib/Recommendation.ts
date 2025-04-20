import WeatherAPI from "@/lib/WeatherAPI";
import {INTERVAL} from "@/lib/INTERVAL";
import DBQuery from "@/lib/DBQuery";
import LinearRegression from "@/lib/LinearRegression";


type Weather = {
    temperature: {value: number, desc: string},
    humidity: {value: number, desc: string},
    pm2_5: {value: number, desc: string},
    people: {value: number, desc: string}
}


class Recommendation {
    private static instance: Recommendation;

    private constructor() {}

    public static getInstance() {
        if (!Recommendation.instance) {
            Recommendation.instance = new Recommendation();
        }
        return Recommendation.instance;
    }

    public async suggestion(
        time?: string,
        lat?: string,
        lon?: string
    ): Promise<{
        suggestion: string,
        desc1: string,
        desc2: string,
        weather: Weather | null
    }> {
        let result = {
            suggestion: "unavailable",
            desc1: "unavailable",
            desc2: "unavailable",
            weather: null
        }
        if (!time || time == "now") {
            time = DBQuery.mapInterval();
        }
        if (!INTERVAL[time]) {
            return result;
        }
        const data = await WeatherAPI.fetchData(time, lat, lon);
        const hourForecast = data.weather;
        result.suggestion = "No";
        const linearRegression = await LinearRegression.getInstance();
        const peoplePredict = await linearRegression.predict(time, lat, lon)
        result.weather = {
            temperature: {value: hourForecast.temp_c, desc: this.temperatureDesc(hourForecast.temp_c)},
            humidity: {value: hourForecast.humidity, desc: this.humidityDesc(hourForecast.humidity)},
            pm2_5: {value: Math.round(data.pm2_5), desc: this.pm2_5Desc(data.pm2_5)},
            people: {value: peoplePredict.percentage, desc: this.peopleDesc(peoplePredict.percentage)}
        }
        if (hourForecast.precip_mm >= 1) {
            result.desc1 = "There's significant rain, which can make outdoor conditions unpleasant, slippery, or even unsafe.";
            result.desc2 = "Consider postponing your plans or switching to indoor activities.";
            return result;
        }
        if (hourForecast.temp_c > 34) {
            result.desc1 = "It's too hot outside, you will get dehydrated easily.";
            result.desc2 = "Being outside in such heat can increase the risk of heat exhaustion or dehydration, especially during midday hours.";
            return result;
        }
        if (hourForecast.temp_c < 10) {
            result.desc1 = "It's cold outside, you might be frozen if you go outdoor.";
            result.desc2 = "Low temperatures can lead to discomfort, especially if you're not dressed warmly enough, and prolonged exposure may be harmful.";
            return result;
        }
        if (29 <= hourForecast.temp_c && hourForecast.temp_c <= 34) {
            result.desc1 = "It's a little hot outside, stay hydrated and avoid exposing to direct sunlight.";
            result.desc2 = "It’s manageable, but you should wear light clothing, use sunscreen, and avoid demanding activities during peak sun hours.";
            result.suggestion = "Maybe";
            return result;
        }
        if (hourForecast.humidity > 70) {
            result.desc1 = "The air is very humid, which can make the temperature feel hotter than it actually is and cause fatigue faster.";
            result.desc2 = "Wear breathable clothing and stay hydrated if you go out.";
            result.suggestion = "Maybe";
            return result;
        }
        if (hourForecast.humidity < 25) {
            result.desc1 = "The air is very dry, stay hydrated.";
            result.desc2 = "This can irritate your skin, eyes, and throat, especially if you have allergies or respiratory sensitivities.";
            result.suggestion = "Maybe";
            return result;
        }
        if (10 <= hourForecast.temp_c &&
            hourForecast.temp_c < 29 &&
            30 <= hourForecast.humidity &&
            hourForecast.humidity <= 60 &&
            hourForecast.precip_mm <= 0.5) {
            result.desc1 = "Perfect for walking, exercising, or socializing outdoors.";
            result.desc2 = "Great Time to Go Outside. The weather is comfortable with mild temperatures, moderate humidity, and little to no precipitation.";
            result.suggestion = "Yes";
            return result;
        }
        result.desc1 = "Weather is okay but not ideal.";
        result.desc2 = "You can go outside, but consider your personal comfort and bring appropriate gear if needed (e.g., jacket, water, umbrella).";
        result.suggestion = "Maybe";
        return result;
    }

    temperatureDesc(temperature: number) {
        if (temperature > 34) {
            return "It's too hot outside.";
        }
        if (temperature < 10) {
            return "It's extremely cold outside.";
        }
        if (29 <= temperature && temperature <= 34) {
            return "It's warm to hot outside, stay hydrated and avoid exposing to direct sunlight.";
        }
        return "Good temperature for going outside.";
    }

    humidityDesc(humidity: number) {
        if (humidity > 70) {
            return "The air is very humid, you might feel hotter than it actually is.";
        }
        if (humidity < 25) {
            return "The air is very dry, your skin will dry and get irritated.";
        }
        if (30 <= humidity && humidity <= 60) {
            return "Humidity is in good condition.";
        }
        return "Humidity is not bad, it's manageable.";
    }

    pm2_5Desc(pm2_5: number) {
        if (pm2_5 > 150) {
            return "Hazardous, stay inside. May pose a serious health risk.";
        }
        if (pm2_5 >= 56) {
            return "Unhealthy, avoid outdoor activity. Can affect breathing and cause irritation.";
        }
        if (pm2_5 >= 36) {
            return "Unhealthy for sensitive groups. Reduce outdoor activity, especially for kids, elderly, or those with respiratory issues";
        }
        if (pm2_5 >= 13) {
            return "Moderate. Okay, but sensitive people should limit long outdoor time";
        }
        return "Good. Safe to go outside,";
    }

    peopleDesc(peoplePercentage: number) {
        if (peoplePercentage >= 75) {
            return "Most people are going outdoor."
        }
        if (peoplePercentage >= 50) {
            return "Fair amount of people are exercising outdoor."
        }
        if (peoplePercentage >= 25) {
            return "Not a lot of people is going to exercise outdoor."
        }
        return "Barely anyone is going outside."
    }
}


export default Recommendation.getInstance();