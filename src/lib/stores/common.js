import { writable } from 'svelte/store';
import { emptyUserData } from '$lib/gql/emptyData/user';

export let actionState = writable('');
export let errorSuccessMessage = writable('');
export let isSideMenuOpen = writable(false);
export let dark = writable(false);
export let userData = writable(emptyUserData);

/** @param {string | undefined } message */
export function displayMessage(message, duration = 3500, isSuccess = '') {
    if (message) {
        errorSuccessMessage.set(message);
        if (isSuccess) actionState.set('Success');
    }
    setTimeout(() => {
        errorSuccessMessage.set('');
    }, duration);
}