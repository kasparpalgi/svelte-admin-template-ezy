import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';
import { sendGraphQLRequest } from '$lib/server/api';
import { USERS } from '$lib/gql/queries/users';
import { setLoginCookie } from '$lib/utils/setUserCookie';

/** @param {FormData} formData @param {import('$lib/types').Cookies} cookies */
export async function handleLogin(formData, cookies) {
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    try {
        const variables = { email };
        const userResponse = await sendGraphQLRequest(USERS, variables);
        const user = userResponse.data.users[0];

        if (!user) {
            return fail(400, { passwordInvalidError: true });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password_hash);
        if (!passwordIsValid) {
            return fail(400, { passwordInvalidError: true });
        }

        setLoginCookie(cookies, user);

        return { success: true, userId: user.id };

    } catch (error) {
        console.error('Error in user login:', error);
        return fail(500, { error: 'Internal server error' });
    }
}
