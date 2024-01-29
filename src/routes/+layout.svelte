<script>
	import '../app.css';
	import { dark } from '$lib/stores/common';
	import { onMount } from 'svelte';

	export let data;

	if (!data.userData || data.userData?.dark_mode === null) {
		onMount(async () => {
			const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			$dark = prefersDarkMode;
			updateUserDataDarkMode(prefersDarkMode ? 'dark' : 'light');
		});
	} else {
		$dark = data.userData.dark_mode ? true : false;
	}

	/** @param {string} mode */
	async function updateUserDataDarkMode(mode) {
		if (!data.userData) data.userData = {};
		data.userData.dark_mode = mode;
		const response = await fetch('/api/set-user-data', {
			method: 'POST',
			body: JSON.stringify(data.userData),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			console.log('User data updated and cookie set');
		} else {
			console.error('Failed to update user data');
		}
	}
</script>

<slot />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
