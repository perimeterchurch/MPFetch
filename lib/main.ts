import { Auth } from './modules/auth';
import { API } from './modules/api';

type APIResponse = {
    data?: any;
    error?: any;
};

const withParams = (url: string, params: string) => {
    let encodedParams = API.encodeParams(params);
    return url + `&spParams=${encodedParams}`;
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
        let response: APIResponse = {
            data: null,
            error: null,
        };

        // User token used for authentication to the API
        let userToken: string | null = null;

        // If there are any params, encode them and add them to the URL
        if (opts.params) {
            url = withParams(url, opts.params);
        }

        // If the user is required, add the requireUser flag and userData token to the URL
        if (opts.requireUser) {
            // Get the user token from local storage, or check if it's expired and refresh it
            userToken = await Auth.getUser();

            // If no user token is found, return an error response
            if (!userToken) {
                return {
                    data: null,
                    error: 'No user found!',
                };
            }

            // Add the user token to the URL
            url = withUser(url, userToken);

            // Fetch the data from the API with the user token
            response = await API.fetchData(url, userToken);
        } else {
            // Fetch the data from the API
            response = await API.fetchData(url);
        }

        // If there is an error, return an error response

        if (!response) {
            response = {
                data: null,
                error: 'No data returned from API',
            };
        }

        return response;
    };
}

export { MPFetch };
