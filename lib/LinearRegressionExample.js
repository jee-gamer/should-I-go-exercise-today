import MultivariateLinearRegression from 'ml-regression-multivariate-linear'

const X = [
    [1, 2], // Feature set 1
    [2, 3], // Feature set 2
    [3, 4], // Feature set 3
    [4, 5], // Feature set 4
];

// Dependent variable (output)
const Y = [
    [3],   // Corresponding output for [1, 2]
    [5],   // Corresponding output for [2, 3]
    [7],   // Corresponding output for [3, 4]
    [9]    // Corresponding output for [4, 5]
];

const regression = new MultivariateLinearRegression(X, Y);

// Predict output for a new set of inputs [5, 6]
const prediction = regression.predict([5, 6]);
console.log(`Prediction for [5, 6]: ${prediction}`);