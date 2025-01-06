import { Log } from './logging';

class Auth {
    static checkCount: number | null = null;

    static getToken = () => {
        Log.debug('Auth/getToken: Getting user token from local storage...');

        let userToken = localStorage.getItem('mpp-widgets_AuthToken');

        if (!userToken || userToken == 'null' || userToken.length < 10) {
            Log.error('Auth/getToken: No user token found!');
            return null;
        }

        Log.debug('Auth/getToken: User token found!');
        return userToken;
    };

    static getExpiration = () => {
        Log.debug(
            'Auth/getExpiration: Getting user token expiration from local storage...'
        );

        let expireData = localStorage.getItem('mpp-widgets_ExpiresAfter');

        if (!expireData) {
            Log.error('Auth/getExpiration: No user token expiration found!');
            return null;
        }

        Log.debug('Auth/getExpiration: User token expiration found!');
        return Date.parse(expireData);
    };

    static checkExpiration = () => {
        Log.debug('Auth/checkExpiration: Checking user token expiration...');

        let expirationDate = this.getExpiration();

        if (!expirationDate || expirationDate < Date.now()) {
            Log.error('Auth/checkExpiration: User token expired!');
            return false;
        }

        Log.debug('Auth/checkExpiration: User token is valid!');
        return true;
    };

    static getUser = () => {
        Log.debug('Auth/getUser: Getting user data...');

        let userToken = this.getToken();

        if (!userToken || !this.checkExpiration()) {
            Log.error('Auth/getUser: No user data found!');
            return null;
        }

        Log.debug('Auth/getUser: User data found!');
        return userToken;
    };

    static recheckAuth = async (
        numChecks: number = 5,
        timeout: number = 4000
    ) => {
        if (!this.checkCount) {
            this.checkCount = 0;
        }

        let sleep = new Promise((resolve) => setTimeout(resolve, timeout));

        while (this.checkCount < numChecks) {
            Log.debug('Auth/recheckAuth: Waiting 5 seconds...');
            await sleep;
            Log.debug('Auth/recheckAuth: Done waiting.');

            this.checkCount++;

            let user = this.getUser();

            if (user) return user;
        }

        return null;
    };
}

export { Auth };
