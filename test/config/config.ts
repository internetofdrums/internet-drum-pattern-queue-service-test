export class Config {
    static readonly baseUrl: string = "http://localhost:8080/1.0";

    static getUrl(endpoint: Endpoints) {
        return this.baseUrl + endpoint;
    }
}

export const enum Endpoints {
    Root = "/",
    Health = "/health",
    Patterns = "/patterns",
    PatternsHead = "/patterns/head",
    PatternsHeadPattern = "/patterns/head/pattern"
}
