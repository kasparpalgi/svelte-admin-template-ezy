<script>
	import { createEventDispatcher } from 'svelte';
	import { dark } from '$lib/stores/common';
	import { goto } from '$app/navigation';

	export let size = 'big';
	/** @type {("button" | "submit" | "reset" | null | undefined)} */
	export let type = 'button';
	export let href = '';
	export let classAdd = '';
	export let disabled = false;
	export let link = false;

	const dispatch = createEventDispatcher();

	let sizeClass = size === 'big' ? 'px-4 py-2' : 'px-2 py-2';

	/** @param {Event} event */
	function handleClick(event) {
		if (href) {
			goto(href);
		} else {
			dispatch('click', event);
		}
	}
</script>

{#if link}
	<button
		class="text-sm font-medium text-purple-600 hover:underline {classAdd}"
		class:dark:text-purple-400={$dark}
		on:click={handleClick}
		><slot />
	</button>
{:else}
	<button
		{type}
		on:click={handleClick}
		class="block w-full text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple {sizeClass} {classAdd} {disabled
			? 'disabled'
			: ''}"
		{disabled}
	>
		<slot />
	</button>
{/if}
