import MultivariateLinearRegression from 'ml-regression-multivariate-linear'
import DBQuery from "@/lib/DBQuery";
import WeatherAPI from "@/lib/WeatherAPI";

const max_people = 30 // max ever, we don't know this yet.

class LinearRegression {
    readonly X: number[][] // a row can have many column
    readonly Y: number[][]
    readonly regressionModel: any
    private static instance: LinearRegression


     private constructor(X: number[][], Y: number[][]) {
        this.X = X;
        this.Y = Y;
        this.regressionModel = new MultivariateLinearRegression(X, Y)
    }

    static async getInstance() {
        if (!LinearRegression.instance) {
            const data = await DBQuery.getFields(["temperature", "humidity", "people"]);
            if (!data.error_message) {
                const X = data.result.map(row => row.slice(0, 2))
                const Y = data.result.map(row => row.slice(2))
                LinearRegression.instance = new LinearRegression(X, Y);
            }
        }
        return LinearRegression.instance
    }

    async predict(time?: string, lat?: string, lon?: string): Promise<{prediction: number, percentage: number}> {
        // call API to get all the weather data
        // predict(Argument Must be same format as X)
        const data = await WeatherAPI.fetchData(time, lat, lon);
        if (!data || data.error) {
            return {prediction: null, percentage: null};
        }
        const prediction: number = this.regressionModel.predict([data.temp_c, data.humidity]);
        const percentage: number = prediction / max_people;
        return {prediction: prediction, percentage: percentage};
    }
}


export default await LinearRegression.getInstance();

