<script>
	import { dark } from '$lib/stores';
</script>

<svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
	<path
		d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
	></path>
</svg>

<span
	aria-hidden="true"
	class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"
	class:dark:border-gray-800={$dark}
></span>
