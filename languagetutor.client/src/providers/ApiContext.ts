import React from 'react';

const apiHost = "https://localhost:5162";

const apiCache = {};

export const apiRequest = (url: string, method: string, body: string, cache: boolean) => {
        if (cache && apiCache[method] && apiCache[method][url]) {
            return Promise.resolve(apiCache[method][url]);
        }
        return fetch(apiHost + url, {
            method: method,
            body: body,
        }).then((res) => {
            if (cache) {
                if (!apiCache[method]) {
                    apiCache[method] = {};
                }
                apiCache[method][url] = res;
            }
            return res;
        });
    };

