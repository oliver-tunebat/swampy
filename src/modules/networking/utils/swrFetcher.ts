import { trackEvent } from "../../analytics/utils/plausible";

export default async function swrFetcher<JSON = unknown>(
    input: RequestInfo,
    init?: RequestInit,
): Promise<JSON> {
    const res = await fetch(input, init);

    if (!res.ok) {
        const error = new SWRFetcherError(res.statusText, res.status);
        trackEvent("Fetcher Error", { status: res.status, path: new URL(res.url).pathname });
        throw error;
    }

    return res.json();
}

export class SWRFetcherError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}