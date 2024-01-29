<script>
	import { dark } from '$lib/stores/common';

	export let classes = '';
</script>

<p class="mt-4 text-gray-700 {classes}" class:dark:text-gray-200={$dark}><slot /></p>
