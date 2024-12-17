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
    }) => {
        Log.debugMode = opts.debug || false;

        let url = `https://${opts.host}.cloudapps.ministryplatform.cloud/sky/api/CustomWidget?storedProcedure=${opts.storedProc}`;

        Log.debug('API URL:', url);

        if (opts.params) {
            let encodedParams = API.encodeParams(opts.params);
            url += `&spParams=${encodedParams}`;

            Log.debug('Encoded params:', encodedParams);
        }

        if (opts.requireUser) {
            url += `&requireUser=true`;

            Log.debug('Getting user...');

            let user = Auth.getUser();

            if (!user) {
                Log.error('No user found!');
                return null;
            }

            Log.debug('User found!');
            url += `&userData=${user}`;

            return await API.fetchData(url, user);
        }

        return await API.fetchData(url);
    };
}

export { MPFetch };
