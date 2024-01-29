import { handleLogin } from '$lib/utils/auth/login';
import { handleSignup } from '$lib/utils/auth/signup';

export const prerender = false;

/** @type {import('@sveltejs/kit').Load} */
export async function load({ url }) {
    const state = url.searchParams.get('max');
    return { state };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const state = String(formData.get('state'));

        if (!state) {
            return handleLogin(formData, cookies);
        } else {
            return handleSignup(formData, cookies, state);
        }
    }
};
