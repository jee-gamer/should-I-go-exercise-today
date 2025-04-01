import MultivariateLinearRegression from 'ml-regression-multivariate-linear'

const max_people = 30 // max ever, we don't know this yet.

export default class LinearRegression {
    X: number[][] // a row can have many column
    Y: number[][]
    regressionModel: any

    constructor (X: number[][], Y: number[][]) {
        this.X = X;
        this.Y = Y;
        this.regressionModel = new MultivariateLinearRegression(X, Y)
    }

    public predict(time: string): [number, number] {
        // call API to get all the weather data
        // predict(Argument Must be same format as X)
        const prediction: number = this.regressionModel.predict(time);
        const percentage = prediction / max_people;

        return [prediction, percentage];
    }
}
