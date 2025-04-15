import type { APIResponse } from '../types/api';

const getParamByName = (param: string, url = window.location.href) => {
    const name = param
        .replace('[', '')
        .replace(']', '')
        .replace('/[[]]/g', '\\$&');

    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const replaceParams = (params: string) => {
    let newParams = params;

    const regex = /\[.*?]/gi;
    let match = regex.exec(newParams);
    while (match) {
        const paramName = getParamByName(match[0]);
        if (paramName) {
            newParams = newParams.replace(match[0], paramName);
        }

        match = regex.exec(newParams);
    }

    return newParams;
};

const encodeParams = (params: string) => {
    return encodeURIComponent(replaceParams(params));
};

const fetchData = async (
    endpoint: string,
    userToken: string | null = null,
    cache: boolean,
): Promise<APIResponse> => {
    const headers = new Headers();

    if (userToken) {
        headers.set('Authorization', `${userToken}`);
    }

    if (!cache) {
        headers.set('Cache-Control', 'no-cache');
    }

    const request = new Request(endpoint, {
        method: 'GET',
        headers: headers,
    });

    const response = await fetch(request);

    if (!response.ok) {
        const responseData = await response.json();

        return {
            data: null,
            error: {
                status: response.status,
                message: responseData.error,
            },
        };
    }

    return {
        data: await response.json(),
        error: null,
    };
};

export const API = {
    fetchData,
    encodeParams,
};
