/**
 * Gets the user token expiration date from local storage and checks if it's expired
 * @returns boolean
 */
const checkTokenExpiration = (): boolean => {
    const expireData = localStorage.getItem('mpp-widgets_ExpiresAfter');

    if (!expireData || expireData === 'null') {
        return false;
    }

    if (Date.parse(expireData) < Date.now()) {
        return false;
    }

    return true;
};

/**
 * Gets the user token from local storage and checks if it's expired
 * @returns string | null
 */
const getUserToken = (): string | null => {
    const userToken = localStorage.getItem('mpp-widgets_AuthToken');

    if (!userToken || userToken === 'null' || userToken.length < 10) {
        return null;
    }

    if (!checkTokenExpiration()) {
        return null;
    }

    return userToken;
};

/**
 * Attempts to fetch the user token multiple times
 * @param numChecks - The number of times to check if the token is expired
 * @param timeout - The timeout in milliseconds between checks
 * @returns Promise<string | null>
 */
const refetchUserToken = async (
    numChecks = 5,
    timeout = 4000,
): Promise<string | null> => {
    const sleep = new Promise((resolve) => setTimeout(resolve, timeout));

    let fetchCount = 0;
    let userToken: string | null = null;
    while (fetchCount < numChecks) {
        await sleep;

        fetchCount++;

        userToken = getUserToken();

        if (userToken) return userToken;

        userToken = null;
    }

    return null;
};

/**
 * Fetches and verifies the user token
 * @returns Promise<string | null>
 */
const fetchUserToken = async (): Promise<string | null> => {
    let userToken = getUserToken();

    if (!userToken) userToken = await refetchUserToken();

    return userToken;
};

export const Auth = { fetchUserToken };
