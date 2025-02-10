class API {
    static getParamByName = (param: string, url = window.location.href) => {
        let name = param
            .replace('[', '')
            .replace(']', '')
            .replace('/[[]]/g', '\\$&');

        let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
        let results = regex.exec(url);

        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    static replaceParams = (params: string) => {
        let newParams = params;

        let regex = /\[.*?]/gi;
        let match;
        while ((match = regex.exec(newParams)) != null) {
            let paramName = this.getParamByName(match[0]);
            if (paramName) {
                newParams = newParams.replace(match[0], paramName);
            }
        }

        return newParams;
    };

    static encodeParams = (params: string) => {
        return encodeURIComponent(this.replaceParams(params));
    };

    static fetchData = async (
        endpoint: string,
        userToken: string | null = null
    ) => {
        let headers = new Headers();

        if (userToken) {
            headers.set('Authorization', `${userToken}`);
        }

        let request = new Request(endpoint, {
            method: 'GET',
            headers: headers,
        });

        let response = await fetch(request);

        if (!response.ok) {
            return null;
        }

        return await response.json();
    };
}

export { API };
