<script>
	import { goto } from '$app/navigation';
	import { dark } from '$lib/stores';

	export let name = '';
	export let gotoPath = '';
</script>

<li
	class="px-2 py-1 transition-colors duration-150 hover:text-gray-800"
	class:dark:hover:text-gray-200={$dark}
>
	<button class="w-full" on:click={() => goto(gotoPath)}> {name}</button>
</li>
