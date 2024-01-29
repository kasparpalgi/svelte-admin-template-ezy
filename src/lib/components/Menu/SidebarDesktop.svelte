<script>
	import { dark } from '$lib/stores';
	import { goto } from '$app/navigation';
	import MenuTop from './MenuTop.svelte';
	import LogoSvg from '../Svg/LogoSvg.svelte';
	import Sidebar from './Sidebar.svelte';
</script>

<aside
	class="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white md:block"
	class:dark:bg-gray-800={$dark}
>
	<Sidebar />
</aside>
