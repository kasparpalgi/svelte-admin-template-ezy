<script>
	import { isSideMenuOpen, dark } from '$lib/stores';
	import { fly } from 'svelte/transition';
	import Sidebar from './Sidebar.svelte';

	// @ts-ignore
	function handleEscape(event) {
		if (event.key === 'Escape') {
			$isSideMenuOpen = false;
		}
	}

	// @ts-ignore
	function handleClickAway(event) {
		if (event.target === event.currentTarget) {
			$isSideMenuOpen = false;
		}
	}
</script>

{#if $isSideMenuOpen}
	<div
		on:click={handleClickAway}
		on:keydown={handleEscape}
		role="button"
		tabindex="0"
		class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
	></div>
	<aside
		class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white md:hidden"
		class:dark:bg-gray-800={$dark}
		transition:fly={{ x: -300, duration: 300 }}
	>
		<Sidebar />
	</aside>
{/if}
