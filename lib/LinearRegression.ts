import MultivariateLinearRegression from 'ml-regression-multivariate-linear'
import DBQuery from "@/lib/DBQuery";
import WeatherAPI from "@/lib/WeatherAPI";
import {INTERVAL} from "@/lib/INTERVAL";


class LinearRegression {
    readonly X: number[][]; // a row can have many column
    readonly Y: number[][];
    readonly maxPeople: number;
    readonly regressionModel: any;
    private static instance: LinearRegression;


     private constructor(X: number[][], Y: number[][], maxPeople: number) {
        this.X = X;
        this.Y = Y;
        this.maxPeople = maxPeople;
        this.regressionModel = new MultivariateLinearRegression(X, Y);
    }

    public static async getInstance() {
        if (!LinearRegression.instance) {
            const data = await DBQuery.getFields(["temperature", "humidity", "people"]);
            if (!data["error_message"]) {
                const X = data["result"].map(row => row.slice(0, 2));
                const Y = data["result"].map(row => row.slice(2));
                const maxPeople = (await DBQuery.getAggregate(["people"], "max"))["people"];
                LinearRegression.instance = new LinearRegression(X, Y, maxPeople);
            }
            console.log(data["error_message"])
        }
        return LinearRegression.instance;
    }

    async predict(time?: string, lat?: string, lon?: string): Promise<{prediction: number, percentage: number}> {
        // call API to get all the weather data
        // predict(Argument Must be same format as X)
        time = time?.toLowerCase();
        if (!time || time == "now") {
            time = DBQuery.mapInterval();
        }
        // lat: 13.847, lon: 100.568 default
        if (!lat || !lon) {
            lat = "13.847";
            lon = "100.568";
        }
        const data = (await WeatherAPI.fetchData(time, lat, lon)).weather;
        if (!data || data.error || !INTERVAL[time]) {
            return {prediction: 0, percentage: 0};
        }
        const prediction: number = this.regressionModel.predict([data.temp_c, data.humidity])[0];
        const percentage: number = prediction / this.maxPeople;
        return {prediction: Math.floor(prediction), percentage: Math.floor(percentage*100)};
    }
}


export default LinearRegression;

