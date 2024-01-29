import { API_URL, API_SECRET } from '$env/static/private';

/** @param {string} query @param {object | null} variables */
export async function sendGraphQLRequest(query, variables = null) {
    try {
        /** @type {{ query: string, variables?: object }} */
        const requestBody = { query };
        if (variables) {
            requestBody.variables = variables;
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': API_SECRET,
            },
            body: JSON.stringify(requestBody),
        });
        return await response.json();
    } catch (error) {
        console.error('Error in API request:', error);
        throw error;
    }
}

