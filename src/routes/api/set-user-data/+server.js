import { UPDATE_USERS } from '$lib/gql/mutations/UpdateUsers';
import { hashPassword } from '$lib/utils/password-utils';
import { sendGraphQLRequest } from '$lib/server/api';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const userData = await request.json();
    const newPassword = userData.newPassword;
    delete userData.newPassword;
    let variables = {
        id: userData.id,
        _set: userData
    };

    console.log('varss: ', variables);

    if (newPassword) {
        const passwordHash = await hashPassword(newPassword);
        variables._set.password_hash = passwordHash;
    }

    const headers = new Headers({
        'Set-Cookie': `max=${encodeURIComponent(JSON.stringify(userData))}; Path=/; HttpOnly; SameSite=Strict; Max-Age=1500000000`,
        'Content-Type': 'application/json'
    });

    try {
        const userResponse = await sendGraphQLRequest(UPDATE_USERS, variables);
        console.log('userResponse:', userResponse);

        return new Response(JSON.stringify({ success: true }), { headers });
    } catch (error) {
        console.error('Error in user login:', error);
        return new Response(JSON.stringify({ success: false }), { headers });
    }
}
