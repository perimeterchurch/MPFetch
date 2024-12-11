class Auth {
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

        if (!expirationDate || expirationDate < Date.now()) return false;

        return true;
    };

    static checkUser = () => {
        let userToken = this.getToken();

        if (!userToken || !this.checkExpiration()) return null;

        return userToken;
    };
}

export { Auth };
