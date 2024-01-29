<script>
	import { isSideMenuOpen, dark, userData } from '$lib/stores/common';
	import { slide } from 'svelte/transition';
	import MenuItem from './MenuItem.svelte';
	import ToggleColorMode from '../ToggleColorMode.svelte';
	import LogoutSvg from './svg/LogoutSvg.svelte';
	import AccountSvg from './svg/AccountSvg.svelte';
	import Notifications from './Notifications.svelte';
	import SearchSvg from './svg/SearchSvg.svelte';
	import HamburgerSvg from './svg/HamburgerSvg.svelte';

	let isNotificationsOpen = false;
	let isProfileMenuOpen = false;

	// @ts-ignore
	function handleEscape(event) {
		if (event.key === 'Escape') {
			$isSideMenuOpen = false;
		}
	}

	// @ts-ignore
	function clickOutside(node) {
		// @ts-ignore
		const handleClick = (event) => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('outsideClick'));
			}
		};

		document.addEventListener('click', handleClick);

		return {
			destroy() {
				document.removeEventListener('click', handleClick);
			}
		};
	}
</script>

<header class="z-10 py-4 bg-white shadow-md" class:dark:bg-gray-800={$dark}>
	<div
		class="container flex items-center justify-between h-full px-6 mx-auto text-purple-600"
		class:dark:text-purple-300={$dark}
	>
		<button
			class="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
			on:click={() => ($isSideMenuOpen = !$isSideMenuOpen)}
			on:keydown={handleEscape}
			aria-label="Menu"
		>
			<HamburgerSvg />
		</button>

		<div class="flex justify-center flex-1 lg:mr-32">
			<div class="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
				<div class="absolute inset-y-0 flex items-center pl-2">
					<SearchSvg />
				</div>
				<input
					class="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input
                {$dark
						? 'dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200'
						: ''}"
					type="text"
					placeholder="Otsi toodet..."
					aria-label="Otsing"
				/>
			</div>
		</div>

		<ul class="flex items-center flex-shrink-0 space-x-6">
			<ToggleColorMode />
			<li class="relative" use:clickOutside on:outsideClick={() => (isNotificationsOpen = false)}>
				<button
					class="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
					on:click={() => {
						isNotificationsOpen = !isNotificationsOpen;
						isProfileMenuOpen = false;
					}}
					aria-label="Notifications"
					aria-haspopup="true"
				>
					<Notifications />
				</button>
				{#if isNotificationsOpen}
					<ul
						transition:slide={{ duration: 300 }}
						class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md
            {$dark ? 'dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700' : ''}"
					>
						<MenuItem title="Mingi teade" redDot="!" />
						<MenuItem title="Mingi teade 2" redDot="!" />
						<MenuItem title="Mingi teade 3" />
					</ul>
				{/if}
			</li>

			<li class="relative" use:clickOutside on:outsideClick={() => (isProfileMenuOpen = false)}>
				<button
					class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
					on:click={() => {
						isProfileMenuOpen = !isProfileMenuOpen;
						isNotificationsOpen = false;
					}}
					aria-label="Account"
					aria-haspopup="true"
				>
					{#if $userData.image_url}
						<img
							class="object-cover w-8 h-8 rounded-full"
							src={$userData.image_url}
							alt="Img"
							aria-hidden="true"
						/>
					{:else}
						<div
							class="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full"
							class:dark:bg-gray-600={$dark}
						>
							<span class="text-lg font-semibold">{$userData.name[0].toUpperCase()}</span>
						</div>
					{/if}
				</button>
				{#if isProfileMenuOpen}
					<ul
						transition:slide={{ duration: 300 }}
						class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md {$dark
							? 'dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700'
							: ''}"
						aria-label="submenu"
					>
						<MenuItem
							title="Minu konto"
							gotoPath="/max/konto"
							isProfileMenu={true}
							on:closeMenu={() => (isProfileMenuOpen = false)}
						>
							<AccountSvg />
						</MenuItem>
						<MenuItem
							title="Logi välja"
							gotoPath="/auth/logout"
							isProfileMenu={true}
							on:closeMenu={() => (isProfileMenuOpen = false)}
						>
							<LogoutSvg />
						</MenuItem>
					</ul>
				{/if}
			</li>
		</ul>
	</div>
</header>
