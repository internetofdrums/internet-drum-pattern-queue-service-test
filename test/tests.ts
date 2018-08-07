import {Config, Endpoints} from "./config/config";
import {HttpContentType} from "./http/httpContentType";
import {HttpHeader} from "./http/httpHeader";
import {HttpMethod} from "./http/httpMethod";
import {HttpStatusCode} from "./http/httpStatusCode";
import {NewDrumPattern} from "./model/newDrumPattern";
import {DrumPatternList} from "./model/drumPatternList";
import {Error, ErrorMessages} from "./model/error";

import * as assert from "assert";
import fetch, {Headers, RequestInit, Response} from "node-fetch";
import {before, describe} from "mocha";
import {DetailedDrumPattern} from "./model/detailedDrumPattern";
import {DrumPatternData} from "./model/drumPatternData";

const uuidRegexp: RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const newDrumPattern01: NewDrumPattern = {
    name: "Billie Jean",
    pattern: "fwAAAH8AAAB/AAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwB/AH8AfwB/AH8AfwB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
};

const newDrumPattern02: NewDrumPattern = {
    name: "A Guy Called Gerald",
    pattern: "fwAAAH8AAAB/AAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAB/AAAAAAAAAAAAAAAAfwAAfwB/AAB/AAB/AAAAAAAAAAAAAAAAAAAAAAAAf38AAH8AAH8AAAAAfwAAAH8AAAAAAAB/AAAAAAB/AAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAfwAAAAB/f38Af38Af39/fwB/f399"
};

const newDrumPattern03: NewDrumPattern = {
    name: "Planet Rock",
    pattern: "fwAAAAB/AAAAAAAAAAAAAAAAAAB/AAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAfwAAAH8AfwB/AH9/AH8Af38AfwAAAAAAAAAAAAAAAAAAAAAAfwB/f38Af39/AH9/f39/fwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
};

describe(Endpoints.Root, () => {
    let url: string = Config.getUrl(Endpoints.Root);

    describe(HttpMethod.Get, () => {
        let result: Response;
        let text: string;

        before(async () => {
            result = await fetch(url);
            text = await result.text();
        });

        it("should have a status code of " + HttpStatusCode.NotFound, async () => {
            assert.strictEqual(result.status, HttpStatusCode.NotFound);
        });

        it("should have a body with error object and description", async () => {
            let error: Error = {
                message: ErrorMessages.NotFound
            };

            assert.strictEqual(text, JSON.stringify(error));
        });
    });
});

describe(Endpoints.Health, () => {
    let url: string = Config.getUrl(Endpoints.Health);

    describe(HttpMethod.Get, () => {
        let result: Response;
        let text: string;

        before(async () => {
            result = await fetch(url);
            text = await result.text();
        });

        it("should have a status code of " + HttpStatusCode.Ok, async () => {
            assert.strictEqual(result.status, HttpStatusCode.Ok);
        });

        it("should have no response body", async () => {
            assert.strictEqual(text, "");
        });
    });
});

describe(Endpoints.PatternsHead, () => {
    let url: string = Config.getUrl(Endpoints.PatternsHead);

    describe(HttpMethod.Get, () => {
        let result: Response;
        let text: string;

        before(async () => {
            result = await fetch(url);
            text = await result.text();
        });

        it("should have a status code of " + HttpStatusCode.NotFound, async () => {
            assert.strictEqual(result.status, HttpStatusCode.NotFound);
        });

        it("should have a body with error object and description", async () => {
            let error: Error = {
                message: ErrorMessages.QueueEmpty
            };

            assert.strictEqual(text, JSON.stringify(error));
        });
    });

    describe(HttpMethod.Delete, () => {
        let options: RequestInit = {
            method: HttpMethod.Delete
        };

        let result: Response;
        let text: string;

        before(async () => {
            result = await fetch(url, options);
            text = await result.text();
        });

        it("should have a status code of " + HttpStatusCode.NotFound, async () => {
            assert.strictEqual(result.status, HttpStatusCode.NotFound);
        });

        it("should have a body with error object and description", async () => {
            let error: Error = {
                message: ErrorMessages.QueueEmpty
            };

            assert.strictEqual(text, JSON.stringify(error));
        });
    });
});

describe(Endpoints.PatternsHeadPattern, () => {
    let url: string = Config.getUrl(Endpoints.PatternsHeadPattern);

    describe(HttpMethod.Get, () => {
        let result: Response;
        let text: string;

        before(async () => {
            result = await fetch(url);
            text = await result.text();
        });

        it("should have a status code of " + HttpStatusCode.NotFound, async () => {
            assert.strictEqual(result.status, HttpStatusCode.NotFound);
        });

        it("should have a body with error object and description", async () => {
            let error: Error = {
                message: ErrorMessages.QueueEmpty
            };

            assert.strictEqual(text, JSON.stringify(error));
        });
    });

    describe(HttpMethod.Delete, () => {
        let options: RequestInit = {
            method: HttpMethod.Delete
        };

        let result: Response;
        let text: string;

        before(async () => {
            result = await fetch(url, options);
            text = await result.text();
        });

        it("should have a status code of " + HttpStatusCode.NotFound, async () => {
            assert.strictEqual(result.status, HttpStatusCode.NotFound);
        });

        it("should have a body with error object and description", async () => {
            let error: Error = {
                message: ErrorMessages.QueueEmpty
            };

            assert.strictEqual(text, JSON.stringify(error));
        });
    });
});

describe(Endpoints.Patterns, () => {
    let url: string = Config.getUrl(Endpoints.Patterns);

    describe(HttpMethod.Get, () => {
        let result: Response;
        let drumPatternList: DrumPatternList;

        before(async () => {
            result = await fetch(url);
            drumPatternList = await result.json();
        });

        it("should have a status code of " + HttpStatusCode.Ok, () => {
            assert.strictEqual(result.status, HttpStatusCode.Ok);
        });

        it("should return an empty list", async () => {
            assert.strictEqual(drumPatternList.length, 0);
        });
    });

    describe(HttpMethod.Post, () => {
        let headers: Headers = new Headers({
            name: HttpHeader.ContentType,
            value: HttpContentType.ApplicationJson
        });

        describe("offer drum pattern to queue", () => {
            let options: RequestInit = {
                method: HttpMethod.Post,
                headers: headers,
                body: JSON.stringify(newDrumPattern01)
            };

            let result: Response;

            before(async () => {
                result = await fetch(url, options);
            });

            it("should have a status code of " + HttpStatusCode.Created, async () => {
                assert.strictEqual(result.status, HttpStatusCode.Created);
            });
        });

        describe("offer same drum pattern to queue again", () => {
            let options: RequestInit = {
                method: HttpMethod.Post,
                headers: headers,
                body: JSON.stringify(newDrumPattern01)
            };

            let result: Response;
            let text: string;

            before(async () => {
                result = await fetch(url, options);
                text = await result.text();
            });

            it("should have a status code of " + HttpStatusCode.UnprocessableEntity, async () => {
                assert.strictEqual(result.status, HttpStatusCode.UnprocessableEntity);
            });

            it("should have a body with error object and description", async () => {
                let error: Error = {
                    message: ErrorMessages.PatternAlreadyPresent
                };

                assert.strictEqual(text, JSON.stringify(error));
            });
        });

        describe("offer another drum pattern to queue", () => {
            let options: RequestInit = {
                method: HttpMethod.Post,
                headers: headers,
                body: JSON.stringify(newDrumPattern02)
            };

            let result: Response;

            before(async () => {
                result = await fetch(url, options);
            });

            it("should have a status code of " + HttpStatusCode.Created, async () => {
                assert.strictEqual(result.status, HttpStatusCode.Created);
            });
        });

        describe("offer drum pattern to full queue", () => {
            let options: RequestInit = {
                method: HttpMethod.Post,
                headers: headers,
                body: JSON.stringify(newDrumPattern03)
            };

            let result: Response;
            let text: string;

            before(async () => {
                result = await fetch(url, options);
                text = await result.text();
            });

            it("should have a status code of " + HttpStatusCode.Accepted, async () => {
                assert.strictEqual(result.status, HttpStatusCode.Accepted);
            });

            it("should have a body with error object and description", async () => {
                let error: Error = {
                    message: ErrorMessages.QueueFull
                };

                assert.strictEqual(text, JSON.stringify(error));
            });
        });

        describe("offer invalid drum pattern to queue", () => {
            let options: RequestInit = {
                method: HttpMethod.Post,
                headers: headers,
                body: "{}"
            };

            let result: Response;
            let text: string;

            before(async () => {
                result = await fetch(url, options);
                text = await result.text();
            });

            it("should have a status code of " + HttpStatusCode.BadRequest, async () => {
                assert.strictEqual(result.status, HttpStatusCode.BadRequest);
            });

            it("should have a body with error object and description", async () => {
                let error: Error = {
                    message: ErrorMessages.PatternNotParsable
                };

                assert.strictEqual(text, JSON.stringify(error));
            });
        });
    });

    describe(HttpMethod.Get, () => {
        let result: Response;
        let drumPatternList: DrumPatternList;

        before(async () => {
            result = await fetch(url);
            drumPatternList = await result.json();
        });

        it("should have a status code of " + HttpStatusCode.Ok, () => {
            assert.strictEqual(result.status, HttpStatusCode.Ok);
        });

        it("should return 2 patterns", async () => {
            assert.strictEqual(drumPatternList.length, 2);
        });

        it("should return the patterns in first-in-first-out order", async () => {
            assert.strictEqual(drumPatternList[0].name, newDrumPattern01.name);
            assert.strictEqual(drumPatternList[1].name, newDrumPattern02.name);
        });
    });
});

describe(Endpoints.PatternsHead, () => {
    let url: string = Config.getUrl(Endpoints.PatternsHead);

    describe(HttpMethod.Get, () => {
        let result: Response;
        let drumPattern: DetailedDrumPattern;

        before(async () => {
            result = await fetch(url);
            drumPattern = await result.json();
        });

        it("should have a status code of " + HttpStatusCode.Ok, async () => {
            assert.strictEqual(result.status, HttpStatusCode.Ok);
        });

        it("should return a correct UUID", async () => {
            assert(uuidRegexp.test(drumPattern.id));
        });

        it("should return the correct name", async () => {
            assert.strictEqual(drumPattern.name, newDrumPattern01.name);
        });

        it("should return the correct pattern", async () => {
            assert.strictEqual(drumPattern.pattern, newDrumPattern01.pattern);
        });
    });

    describe(HttpMethod.Delete, () => {
        let options: RequestInit = {
            method: HttpMethod.Delete
        };

        let result: Response;
        let drumPattern: DetailedDrumPattern;

        before(async () => {
            result = await fetch(url, options);
            drumPattern = await result.json();
        });

        it("should have a status code of " + HttpStatusCode.Ok, async () => {
            assert.strictEqual(result.status, HttpStatusCode.Ok);
        });

        it("should return a correct UUID", async () => {
            assert(uuidRegexp.test(drumPattern.id));
        });

        it("should return the correct name", async () => {
            assert.strictEqual(drumPattern.name, newDrumPattern01.name);
        });

        it("should return the correct pattern", async () => {
            assert.strictEqual(drumPattern.pattern, newDrumPattern01.pattern);
        });
    });
});

describe(Endpoints.PatternsHeadPattern, () => {
    let url: string = Config.getUrl(Endpoints.PatternsHead);

    describe(HttpMethod.Get, () => {
        let result: Response;
        let drumPattern: DrumPatternData;

        before(async () => {
            result = await fetch(url);
            drumPattern = await result.json();
        });

        it("should have a status code of " + HttpStatusCode.Ok, async () => {
            assert.strictEqual(result.status, HttpStatusCode.Ok);
        });

        it("should return the correct pattern", async () => {
            assert.strictEqual(drumPattern.pattern, newDrumPattern02.pattern);
        });
    });

    describe(HttpMethod.Delete, () => {
        let options: RequestInit = {
            method: HttpMethod.Delete
        };

        let result: Response;
        let drumPattern: DetailedDrumPattern;

        before(async () => {
            result = await fetch(url, options);
            drumPattern = await result.json();
        });

        it("should have a status code of " + HttpStatusCode.Ok, async () => {
            assert.strictEqual(result.status, HttpStatusCode.Ok);
        });

        it("should return the correct pattern", async () => {
            assert.strictEqual(drumPattern.pattern, newDrumPattern02.pattern);
        });
    });
});

describe(Endpoints.Patterns, () => {
    let url: string = Config.getUrl(Endpoints.Patterns);

    describe(HttpMethod.Get, () => {
        let result: Response;
        let drumPatternList: DrumPatternList;

        before(async () => {
            result = await fetch(url);
            drumPatternList = await result.json();
        });

        it("should have a status code of " + HttpStatusCode.Ok, () => {
            assert.strictEqual(result.status, HttpStatusCode.Ok);
        });

        it("should return an empty list", async () => {
            assert.strictEqual(drumPatternList.length, 0);
        });
    });
});
