import { MPAuth as Auth } from './modules/auth';
import { MPFetch as Api } from './modules/api';

const getData = async (opts: {
    host: string;
    storedProc: string;
    params?: string;
    requireUser?: boolean;
}) => {
    let url = `https://${opts.host}.cloudapps.ministryplatform.cloud/sky/api/CustomWidget?storedProcedure=${opts.storedProc}`;

    if (opts.params) {
        url += `&spParams=${Api.encodeParams(opts.params)}`;
    }

    if (opts.requireUser) {
        let user = Auth.checkUser();

        if (!user) {
            console.error('User not logged in!');
            return null;
        }

        url += `&requireUser=true&userData=${user}`;

        return await Api.fetchData(url, user);
    }

    return await Api.fetchData(url);
};

export { getData };
