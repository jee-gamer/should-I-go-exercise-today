export default class Recommendation {
    _instance: Recommendation;
    criteria: any

    private constructor() {}

    public getInstance() {
        if (!this._instance) {
            this._instance = new Recommendation();
        }
        return this._instance;
    }

    public yesOrNo(): string {
        return "YES"
        // NO, MAYBE, SOMETHING LIKE THAT
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