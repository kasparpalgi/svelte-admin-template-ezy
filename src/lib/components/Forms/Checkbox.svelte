<script>
	import { dark } from '$lib/stores/common';
	export let label = '';
	export let checked = false;
	export let classes = '';
</script>

<label class="flex items-center {classes}" class:dark:text-gray-400={$dark}>
	<input
		type="checkbox"
		class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
		class:dark:focus:shadow-outline-gray={$dark}
		bind:checked
	/>
	<span class="ml-2">
		{label}
	</span>
</label>
