import type { APIResponse } from './types/api';

import { Auth } from './modules/auth';
import { API } from './modules/api';

const withParams = (url: string, params: string) => {
    return url + `&spParams=${API.encodeParams(params)}`;
};

const withUser = (url: string, userToken: string) => {
    return url + `&requireUser=true&userData=${userToken}`;
};

class MPFetch {
    /**
     * Fetches data from the MinistryPlatform custom widget API
     * @param opts - Options passed to the API call
     * @returns Promise<{ data?: any; error?: any }>
     */
    static getData = async (opts: {
        host: string;
        storedProc: string;
        params?: string;
        requireUser?: boolean;
        debug?: boolean;
    }): Promise<APIResponse> => {
        // API endpoint
        let url = `https://${opts.host}.cloudapps.ministryplatform.cloud/sky/api/CustomWidget?storedProcedure=${opts.storedProc}`;

        // If there are any params, encode them and add them to the URL
        if (opts.params) {
            url = withParams(url, opts.params);
        }
        // User token used for authentication to the API
        let userToken: string | null = null;

        // If the user is required, add the requireUser flag and userData token to the URL
        if (opts.requireUser) {
            // Get the user token from local storage, or check if it's expired and refresh it
            userToken = await Auth.fetchUserToken();

            // Add the user token to the URL
            url = withUser(url, userToken || '');
        }

        return await API.fetchData(url, userToken || null);
    };
}

export { MPFetch };
