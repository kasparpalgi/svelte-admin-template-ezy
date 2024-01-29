<script>
	import { dark } from '$lib/stores/common';
	import MenuTop from './MenuTop.svelte';
	import LogoSvg from '../Svg/LogoSvg.svelte';
</script>

<div class="py-4 text-gray-500" class:dark:text-gray-400={$dark}>
	<MenuTop />
	<div class="flex justify-center -ml-12">
		<LogoSvg />
	</div>
</div>
