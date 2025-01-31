import { Auth } from './modules/auth';
import { API } from './modules/api';
import { Log } from './modules/logging';

class MPFetch {
    static getData = async (opts: {
        host: string;
        storedProc: string;
        params?: string;
        requireUser?: boolean;
        debug?: boolean;
    }): Promise<{ data?: any; error?: any }> => {
        Log.debugMode = opts.debug || false;

        let url = `https://${opts.host}.cloudapps.ministryplatform.cloud/sky/api/CustomWidget?storedProcedure=${opts.storedProc}`;
        let user: string | null = null;

        if (opts.params) {
            let encodedParams = API.encodeParams(opts.params);
            url += `&spParams=${encodedParams}`;
        }

        if (opts.requireUser) {
            url += `&requireUser=true`;

            user = Auth.getUser();

            if (!user) {
                user = await Auth.recheckAuth();

                if (!user) {
                    return {
                        data: null,
                        error: 'No user found!',
                    };
                }
            }

            url += `&userData=${user}`;
        }

        let response = await API.fetchData(url, user);

        if (!response) {
            return {
                data: null,
                error: 'No data returned from API',
            };
        }

        if (response.error) {
            return {
                data: null,
                error: {
                    message: response.error,
                    details: response.details || null,
                },
            };
        }

        return {
            data: response,
            error: null,
        };
    };
}

export { MPFetch };
