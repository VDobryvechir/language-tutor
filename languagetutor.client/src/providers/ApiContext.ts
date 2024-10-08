import { showError } from './Notifier';
const globalRoot: any = window as any; 
const apiHost = globalRoot.DvApiHost !== undefined ? globalRoot.DvApiHost :  "https://localhost:7001";
export interface ApiContextOption {
    cache?: boolean;
    isForm?: boolean;
    isBlob?: boolean;
    headers?: { [key: string]: string };
};
const apiCache: { [key: string]: {[key:string]: string}} = {};

export const apiRequest = (url: string, method?: string, body?: any, options?: ApiContextOption) => {
    if (!method) {
        method = "GET";
    }
    if (options?.cache && apiCache[method] && apiCache[method][url]) {
        return Promise.resolve(apiCache[method][url]);
    }
    if (!url.startsWith('http')) {
        url = apiHost + url;
    }
    const headers = options?.headers || {};
    if (!headers['Content-Type'] && method !== "GET" && !(body instanceof FormData)) {
        headers['Content-Type'] = options?.isForm ? "application/x-www-form-urlencoded" : "application/json";
    }
    const fetchData = {
        method: method,
        body: anyPayloadToBody(body),
        headers: headers,
    };
    const isBlob = options?.isBlob;
    return fetch(url, fetchData).then((response) => { return isBlob ? response.blob() : response.json(); })
        .then((res) => {
            if (options?.cache) {
                if (!apiCache[method]) {
                    apiCache[method] = {};
                }
                apiCache[method][url] = res;
            }
            return res;
        }).catch((reason) => {
            console.log(reason);
            showError("Server error");
        });
 };

export const anyPayloadToBody = (payload: any): string | null | FormData => {
    if (typeof payload === "function") {
        payload = payload();
    }
    if (!payload) {
        return null;
    }
    if (typeof payload === "string" || payload instanceof FormData) {
        return payload;
    }
    return JSON.stringify(payload);
}
