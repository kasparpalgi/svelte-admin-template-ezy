<script>
	import { scale } from 'svelte/transition';
	import { writable } from 'svelte/store';

	export let isModalOpen = false;
	const originalSeconds = 15;
	const seconds = writable(originalSeconds);

	/** @type {number | undefined} */
	let countdownInterval;

	$: if (isModalOpen) {
		seconds.set(originalSeconds);
		countdownInterval = /** @type {number} */ (
			/** @type {unknown} */ (
				setInterval(() => {
					seconds.update((n) => {
						if (n > 1) {
							return n - 1;
						} else {
							clearInterval(/** @type {number} */ (countdownInterval));
							isModalOpen = false;
							return 0;
						}
					});
				}, 1000)
			)
		);
	} else {
		if (countdownInterval !== undefined) {
			clearInterval(countdownInterval);
		}
	}

	$: formattedSeconds = $seconds;
</script>

{#if isModalOpen}
	<div
		class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
	>
		<div
			in:scale
			class="w-full px-6 py-4 bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
			role="dialog"
		>
			<div class="mt-4 mb-6">
				<p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">Door is unlocked</p>
				<p class="text-sm text-gray-700 dark:text-gray-400">
					The door will be locked automatically in
					<span
						class="font-bold"
						class:text-red-500={formattedSeconds <= 5}
						style="font-size: larger;"
					>
						{formattedSeconds}
					</span>
					seconds
				</p>
			</div>
			<footer
				class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
			>
				<button
					on:click={() => (isModalOpen = false)}
					class="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
				>
					Lock now
				</button>
				<button
					on:click={() => (isModalOpen = false)}
					class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
				>
					OK
				</button>
			</footer>
		</div>
	</div>
{/if}
