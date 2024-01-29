<script>
	import { scale } from 'svelte/transition';
	import { dark } from '$lib/stores/common';
	import { ArrowLeftCircle } from 'lucide-svelte';

	export let title = '';
	export let backArrow = false;

	$: backColor = $dark ? '#9E9E9E' : '#707275';

	function goBack() {
		window.history.back();
	}
</script>

<div class="relative">
	<h2 in:scale class="my-6 text-2xl font-semibold text-gray-700" class:dark:text-gray-200={$dark}>
		{title}
	</h2>
	{#if backArrow}
		<button class="absolute right-0 p-2 top-2" on:click={goBack}>
			<ArrowLeftCircle color={backColor} />
		</button>
	{/if}
</div>
