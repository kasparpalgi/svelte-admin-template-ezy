<script>
	import { dark } from '$lib/stores/common';

	export let label = '';
	/** @type {any | null }*/
	export let options;
	export let name = '';
	export let selectedValue = '';

	/** @param {Event & { currentTarget: HTMLInputElement }} event */
	function updateValue(event) {
		if (event.currentTarget) selectedValue = event.currentTarget.value;
	}
</script>

<div class="mt-4 text-sm">
	<span class="text-gray-700" class:dark:text-gray-400={$dark}> {label} </span>
	<div class="mt-2">
		{#each options as option, index}
			<label
				class="inline-flex items-center text-gray-600 {index !== 0 ? 'ml-6' : ''}"
				class:dark:text-gray-400={$dark}
			>
				<input
					type="radio"
					class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
					class:dark:focus:shadow-outline-gray={$dark}
					{name}
					value={option.value.toString()}
					on:change={updateValue}
					checked={selectedValue === option.value.toString()}
				/>
				<span class="ml-2">{option.label}</span>
			</label>
		{/each}
	</div>
</div>
