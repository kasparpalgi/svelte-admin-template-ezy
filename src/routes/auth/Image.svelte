<script>
	import { dark } from '$lib/stores/common';
</script>

<div class="h-32 md:h-auto md:w-1/2">
	<img
		aria-hidden="true"
		class="object-cover w-full h-full"
		class:dark:hidden={$dark}
		src="/img/auth.jpg"
		alt="Auth"
	/>
	<img
		aria-hidden="true"
		class="hidden object-cover w-full h-full"
		class:dark:block={$dark}
		src="/img/auth-dark.jpg"
		alt="Auth"
	/>
</div>
