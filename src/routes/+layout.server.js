import { parseCookies } from '$lib/utils/parseCookieToObject';

/** @type {import('@sveltejs/kit').ServerLoad} */
export const load = async ({ request }) => {
    const cookies = request.headers.get('cookie');
    const cookieData = (parseCookies(cookies ?? ''))['max'];
    const userData = cookieData ? JSON.parse(decodeURIComponent(cookieData)) : null;

    return { userData }
}