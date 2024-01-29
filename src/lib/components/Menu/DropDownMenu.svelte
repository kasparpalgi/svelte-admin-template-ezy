<script>
	import { dark } from '$lib/stores/common';
	import { Percent } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import MenuItemSub from './MenuItemSub.svelte';

	let isDropDownOpen = false;
</script>

<li class="relative px-6 py-3">
	<button
		class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
		class:dark:hover:text-gray-200={$dark}
		on:click={() => (isDropDownOpen = !isDropDownOpen)}
		aria-haspopup="true"
	>
		<span class="inline-flex items-center">
			<Percent size="20" />
			<span class="ml-4">Lisamenüü</span>
		</span>
		<svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			></path>
		</svg>
	</button>
	{#if isDropDownOpen}
		<ul
			class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 {$dark
				? 'dark:text-gray-400 dark:bg-gray-900'
				: ''}"
			aria-label="submenu"
			transition:slide={{ duration: 300 }}
		>
			<MenuItemSub name="Menüü 1" gotoPath="/max" />
			<MenuItemSub name="Menüü 2" gotoPath="/max" />
			<MenuItemSub name="Menüü 3" gotoPath="/max" />
		</ul>
	{/if}
</li>
