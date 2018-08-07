export class Config {
    public static getUrl(endpoint: Endpoints) {
        return this.baseUrl + endpoint;
    }

    private static readonly baseUrl: string = "http://localhost:8080/1.0";
}

export const enum Endpoints {
    Root = "/",
    Health = "/health",
    Patterns = "/patterns",
    PatternsHead = "/patterns/head",
    PatternsHeadPattern = "/patterns/head/pattern",
}
