import { fail } from '@sveltejs/kit';
import { hashPassword, passwordStrngthChecker } from '$lib/utils/password-utils';
import validEmail from '$lib/utils/emailValidCheck';
import { sendGraphQLRequest } from '$lib/server/api';
import { INSERT_USERS } from '$lib/gql/mutations/insertUsers';
import { setLoginCookie } from '$lib/utils/setUserCookie';

/** @param {FormData} formData @param {import('$lib/types').Cookies} cookies @param {String} state */
export async function handleSignup(formData, cookies, state) {
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const confirm_password = formData.get('confirm_password');
    const name = String(formData.get('name'));
    const darkModeString = formData.get('dark_mode');
    const dark_mode = darkModeString === "true";
    const locale = String(formData.get('locale'));
    let passwordHash = '';

    if (!password || !passwordStrngthChecker(password)) {
        return fail(400, { passwordStrengthError: true });
    }

    if (password !== confirm_password) {
        return fail(400, { passwordMismatchError: true });
    }

    if (!validEmail(email)) {
        return fail(400, { validEmailError: true });
    }

    if (!name || name.length < 7) {
        return fail(400, { nameError: true });
    }

    try {
        passwordHash = await hashPassword(password);
    } catch (error) {
        console.error('Error hashing password:', error);
        return fail(500, { error: 'Internal server error during password hashing' });
    }

    const role = state === 'signup' ? 'user' : 'owner';
    const variables = {
        objects: { email, name, password_hash: passwordHash, role, dark_mode, locale }
    };

    try {
        const result = await sendGraphQLRequest(INSERT_USERS, variables);

        if (result.data && !result.errors) {
            /** @type {import('$lib/types').User} */
            const newUser = {
                id: result.data.insert_users.returning[0].id,
                name,
                email,
                mobile: null,
                role,
                locale,
                dark_mode,
                image_url: null,
                receive_discounts: true,
                metadata: {
                    about_me: null,
                    address: null
                }
            }
            setLoginCookie(cookies, newUser);
            return { success: true, userId: newUser.id };
        } else {
            // Handle potential duplicate email error
            const hasDuplicateEmailError = result.errors.some(/** @param {{ message: string }} e */e => e.message.includes('users_email_key'));
            if (hasDuplicateEmailError) {
                return fail(400, { duplicateEmailError: true });
            }
            return fail(400, { error: 'Error creating user' });
        }
    } catch (error) {
        console.error('Error in user creation:', error);
        return fail(500, { error: 'Internal server error' });
    }
}
