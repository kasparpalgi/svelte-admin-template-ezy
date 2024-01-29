<script>
	import { dark, errorSuccessMessage, displayMessage } from '$lib/stores/common';
	import { trans } from '$lib/settings/auth';
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import ErrorSuccess from '$lib/components/ErrorSuccess.svelte';
	import TextInput from '$lib/components/Forms/TextInput.svelte';
	import ToggleColorMode from '$lib/components/ToggleColorMode.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Button from '$lib/components/Forms/Button.svelte';
	import Image from './Image.svelte';

	export let data;

	let localState = '';

	const submitForm = () => {
		localState = 'submitting';
		// @ts-ignore
		return async (options) => {
			localState = '';

			if (options?.result?.data?.success) {
				await goto('/max');
			}
			if (options?.result?.data?.nameError) displayMessage(trans?.nameError);
			if (options?.result?.data?.passwordInvalidError) displayMessage(trans?.wrongPass, 5000);
			if (options?.result?.data?.duplicateEmailError) displayMessage(trans?.duplicateEmailError);
			if (options?.result?.data?.passwordMissingError) displayMessage(trans?.passwordMissingError);
			if (options?.result?.data?.passwordMismatchError)
				displayMessage(trans?.passwordMismatchError);
			if (options?.result?.data?.validEmailError) displayMessage(trans?.validEmailError);
			if (options?.result?.data?.passwordStrengthError)
				displayMessage(trans?.passwordStrengthError, 5000);
		};
	};
</script>

<svelte:head>
	<title>{trans?.authenticationTitle}</title>
</svelte:head>

<div class="flex items-center min-h-screen p-6 bg-gray-50" class:dark:bg-gray-900={$dark}>
	<div
		class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl"
		class:dark:bg-gray-800={$dark}
	>
		<div class="flex flex-col overflow-y-auto md:flex-row">
			<Image />
			<div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
				<div class="w-full">
					{#if !trans}
						<Loader />
					{:else}
						<div class="flex items-center justify-between mb-4">
							<h1 class="text-xl font-semibold text-gray-700" class:dark:text-gray-200={$dark}>
								{#if data.state === 'signup'}{trans?.createAccount}{:else if data.state === 'rent_my_space'}
									{trans?.createAccount} &
									{trans?.signupRentSpace}{:else}{trans?.login}{/if}
							</h1>
							<div class="flex items-center">
								<div class="mb-1 mr-1">
									<ToggleColorMode />
								</div>
							</div>
						</div>
						<form in:scale method="POST" use:enhance={submitForm} class="space-y-4">
							<input type="hidden" name="state" value={data.state} />
							<input type="hidden" name="dark_mode" value={$dark} />
							{#if data.state}
								<TextInput
									label={trans?.yourName}
									name="name"
									placeholder={trans?.namePlaceholder}
								/>
							{/if}
							<TextInput
								label={trans?.email}
								name="email"
								placeholder={trans?.emailPlaceholder}
								type="email"
							/>
							<TextInput
								label={trans?.password}
								name="password"
								placeholder="***************"
								type="password"
							/>
							{#if data.state}
								<TextInput
									label={trans?.retypePassword}
									name="confirm_password"
									placeholder="***************"
									type="password"
								/>
							{/if}

							{#if $errorSuccessMessage}
								<ErrorSuccess message={$errorSuccessMessage} />
							{/if}

							<Button type="submit">
								{#if localState === ''}
									{data.state ? trans?.signup : trans?.login}
								{:else}
									{trans?.oneSecond}
								{/if}
							</Button>
						</form>
						<hr class="my-8" />

						<div class="mt-6 text-center">
							{#if data.state}
								<div>
									<Button link href="/auth">{trans?.haveAccount}</Button>
								</div>
							{:else}
								<p class="mt-4">
									<Button link href="/auth/forgot">{trans?.forgotPassword}</Button>
								</p>

								<p class="mt-4 font-medium text-black" class:dark:text-white={$dark}>
									{trans?.dontHaveAccount}
								</p>
								<div>
									<Button link href="/auth?ezy=signup"
										>{trans?.signupProvider} 34 {trans?.nearbyDoors}</Button
									>
								</div>
								<div>
									<Button link href="/auth?ezy=rent_my_space">{trans?.signupRentYourSpace}</Button>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
