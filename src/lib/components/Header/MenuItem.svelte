<script>
	import { goto } from '$app/navigation';
	import { dark } from '$lib/stores/common';
	import { createEventDispatcher } from 'svelte';

	export let title = '';
	export let redDot = '';
	export let gotoPath = '/max';
	export let isProfileMenu = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		goto(gotoPath);
		dispatch('closeMenu');
	}
</script>

<li class="flex">
	<button
		class={`inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md ${
			isProfileMenu ? 'justify-start' : 'justify-between'
		} hover:bg-gray-100 hover:text-gray-800 ${
			$dark ? 'dark:hover:bg-gray-800 dark:hover:text-gray-200' : ''
		}`}
		on:click={handleClick}
	>
		<slot />
		<span>{title}</span>
		{#if redDot}
			<span
				class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600"
			>
				{redDot}
			</span>
		{/if}
	</button>
</li>
