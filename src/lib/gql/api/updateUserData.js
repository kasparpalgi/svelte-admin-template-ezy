/** @param {any} userData */
export async function updateUserData(userData, endpoint = '') {
    const apiEndpoint = endpoint + '/api/set-user-data' || '/api/set-user-data';

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        return 'Success';
    } else {
        return response;
    }
}
