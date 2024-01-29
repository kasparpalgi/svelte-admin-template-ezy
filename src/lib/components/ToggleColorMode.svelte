<script>
	import { dark } from '$lib/stores/common';
	import LightSvg from './Svg/LightSvg.svelte';
	import MoonSvg from './Svg/MoonSvg.svelte';
</script>

<li class="flex text-purple-600" class:dark:text-purple-300={$dark}>
	<button
		type="button"
		class="rounded-md"
		on:click={() => ($dark = !$dark)}
		aria-label="Toggle color mode"
	>
		{#if $dark}
			<MoonSvg />
		{:else}
			<LightSvg />
		{/if}
	</button>
</li>
