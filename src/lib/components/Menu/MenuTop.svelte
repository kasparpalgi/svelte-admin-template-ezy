<script>
	import { dark, userData } from '$lib/stores/common';
	import { Barcode, TrendingDown, Users, BadgeHelp } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import MenuItem from './MenuItem.svelte';
	import DropDownMenu from './DropDownMenu.svelte';
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;
</script>

<button
	class="hidden ml-6 text-lg font-bold text-gray-800 md:inline"
	class:dark:text-gray-200={$dark}
	on:click={() => goto('/max')}
>
	Maxilla
</button>
<ul class="mt-6">
	<MenuItem name="Tooted" isCurrentPath={currentPath === '/max'} icon={Barcode} />
	{#if $userData.role.includes('haldur')}
		<MenuItem
			name="Statistika"
			gotoPath="/max/statistika"
			isCurrentPath={currentPath === '/max/statistika'}
			icon={TrendingDown}
		/>
		<MenuItem
			name="Töötajad"
			gotoPath="/max/tootajad"
			isCurrentPath={currentPath === '/max/tootajad'}
			icon={Users}
		/>
	{/if}
	<MenuItem
		name="Kasutusjuhend"
		gotoPath="/max/abi"
		isCurrentPath={currentPath === '/max/abi'}
		icon={BadgeHelp}
	/>
	<DropDownMenu />
</ul>
