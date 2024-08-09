import React from 'react';

const apiHost = window.DvApiHost !== undefined ? window.DvApiHost :  "https://localhost:7001";

const apiCache = {};

export const apiRequest = (url: string, method?: string, body?: string | null, cache?: boolean) => {
    if (!method) {
        method = "GET";
    }
    if (cache && apiCache[method] && apiCache[method][url]) {
        return Promise.resolve(apiCache[method][url]);
    }
    if (!url.startsWith('http')) {
        url = apiHost + url;
    }
    return fetch(url, {
            method: method,
            body: body,
    }).then( (response)=> { return response.json(); })
        .then((res) => {
            if (cache) {
                if (!apiCache[method]) {
                    apiCache[method] = {};
                }
                apiCache[method][url] = res;
            }
            return res;
        });
    };

