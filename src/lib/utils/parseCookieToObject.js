/** Parses a cookie string into an object
* @param {string | undefined} [cookieString=""] - String to parse. Defaults to '' if undefined
* @returns {{ [key: string]: string }} - An object representing the cookie
*/
export function parseCookies(cookieString = '') {
    return cookieString.split(';').reduce(
        /**
         * @param {{ [key: string]: string }} cookies - Accumulator for the cookies.
         * @param {string} cookie - Current cookie string.
         * @returns {{ [key: string]: string }}
         */
        (cookies, cookie) => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            cookies[name] = value;
            return cookies;
        },
        ({})
    );
}