<script>
	import { isSideMenuOpen, dark } from '$lib/stores/common';
	import { goto } from '$app/navigation';
	export let name = '';
	export let gotoPath = '/max';
	export let isCurrentPath = false;
	/** @type {any} */
	export let icon;

	$: activeClasses = $dark ? 'text-gray-100' : 'text-gray-800';
	const inactiveClasses = 'hover:text-gray-800 dark:hover:text-gray-200';

	$: classString = isCurrentPath ? activeClasses : inactiveClasses;

	/** @param {string} path */
	function gotoPage(path) {
		$isSideMenuOpen = false;
		goto(path);
	}
</script>

<li class="relative px-6 py-3">
	<button
		class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 {classString}"
		on:click={() => gotoPage(gotoPath)}
	>
		<svelte:component this={icon} size="20" />
		<span class="ml-4">{name}</span>
	</button>
</li>
