class Auth {
    static checkCount: number | null = null;

    static getToken = () => {
        let userToken = localStorage.getItem('mpp-widgets_AuthToken');

        if (!userToken || userToken == 'null' || userToken.length < 10) {
            return null;
        }

        return userToken;
    };

    static getExpiration = () => {
        let expireData = localStorage.getItem('mpp-widgets_ExpiresAfter');

        if (!expireData) {
            return null;
        }

        return Date.parse(expireData);
    };

    static checkExpiration = () => {
        let expirationDate = this.getExpiration();

        if (!expirationDate || expirationDate < Date.now()) {
            return false;
        }

        return true;
    };

    static getUser = async () => {
        let userToken = this.getToken();

        if (!userToken || !this.checkExpiration()) {
            userToken = await this.recheckAuth();
        }

        return userToken;
    };

    static recheckAuth = async (
        numChecks: number = 5,
        timeout: number = 4000
    ): Promise<string | null> => {
        if (!this.checkCount) {
            this.checkCount = 0;
        }

        let sleep = new Promise((resolve) => setTimeout(resolve, timeout));

        while (this.checkCount < numChecks) {
            await sleep;

            this.checkCount++;

            let user = this.getUser();

            if (user) return user;
        }

        return null;
    };
}

export { Auth };
