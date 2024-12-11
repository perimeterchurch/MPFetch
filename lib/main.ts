import { Auth } from './modules/auth';
import { API } from './modules/api';

class MPFetch {
    static getData = async (opts: {
        host: string;
        storedProc: string;
        params?: string;
        requireUser?: boolean;
    }) => {
        let url = `https://${opts.host}.cloudapps.ministryplatform.cloud/sky/api/CustomWidget?storedProcedure=${opts.storedProc}`;

        if (opts.params) {
            url += `&spParams=${API.encodeParams(opts.params)}`;
        }

        if (opts.requireUser) {
            let user = Auth.checkUser();

            if (!user) {
                console.error('User not logged in!');
                return null;
            }

            url += `&requireUser=true&userData=${user}`;

            return await API.fetchData(url, user);
        }

        return await API.fetchData(url);
    };
}

export { MPFetch };
