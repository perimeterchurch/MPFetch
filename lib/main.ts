import type { APIResponse } from './types/api';

import { API } from './modules/api';
import { Auth } from './modules/auth';

const addParams = (url: string, params: string) => {
    return `${url}&spParams=${API.encodeParams(params)}`;
};

const addUser = (url: string, userToken: string) => {
    return `${url}&requireUser=true&userData=${userToken}`;
};

const addCache = (url: string, cache: boolean) => {
    return `${url}&cacheData=${cache ? 'true' : 'false'}`;
};

/**
 * Fetches data from the MinistryPlatform custom widget API
 * @param opts - Options passed to the API call
 * @returns Promise<{ data?: any; error?: any }>
 */
const getData = async (opts: {
    host: string;
    storedProc: string;
    params?: string;
    requireUser?: boolean;
    debug?: boolean;
    cache?: boolean;
}): Promise<APIResponse> => {
    // API endpoint
    let url = `https://${opts.host}.cloudapps.ministryplatform.cloud/sky/api/CustomWidget?storedProcedure=${opts.storedProc}`;

    // If there are any params, encode them and add them to the URL
    if (opts.params) {
        url = addParams(url, opts.params);
    }
    // User token used for authentication to the API
    let userToken: string | null = null;

    // If the user is required, add the requireUser flag and userData token to the URL
    if (opts.requireUser) {
        // Get the user token from local storage, or check if it's expired and refresh it
        userToken = await Auth.fetchUserToken();

        // Add the user token to the URL
        url = addUser(url, userToken || '');
    }

    if (opts.cache) {
        url = addCache(url, opts.cache);
    } else {
        url = addCache(url, false);
    }

    url = addCache(url, opts.cache || false);

    if (opts.debug) {
        console.log('MPFetch URL', url);
    }

    return await API.fetchData(url, userToken || null, opts.cache || false);
};

export const MPFetch = { getData };
