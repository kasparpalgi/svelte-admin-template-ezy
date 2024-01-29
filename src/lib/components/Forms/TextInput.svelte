<script>
	import { dark } from '$lib/stores/common';
	export let label = '';
	export let name = '';
	export let type = 'text';
	export let placeholder = '';
	/** @type {string | null} */
	export let value = null;
	export let classes = '';
	export let errorMessage = '';
	/** @type {string | null} */
	export let icon = null;
	export let isTextArea = false;
	export let helperText = '';

	$: baseClasses = `block w-full mt-1 text-sm ${
		$dark ? 'dark:bg-gray-700 dark:text-gray-300 dark:focus:shadow-outline-gray' : ''
	}`;
	$: errorClasses = errorMessage
		? 'border-red-600 focus:border-red-400 focus:shadow-outline-red'
		: 'focus:border-purple-400 focus:outline-none focus:shadow-outline-purple';
	$: borderClasses = `${errorClasses} ${
		$dark && errorMessage ? 'dark:border-red-600' : 'dark:border-gray-600'
	}`;
</script>

<label class="block text-sm {classes}">
	<span class="text-gray-700" class:dark:text-gray-400={$dark}>
		{label}
	</span>
	{#if icon && !isTextArea}
		<div class="relative">
			<input
				class="form-input pl-10 {baseClasses} {borderClasses}"
				{name}
				{type}
				{placeholder}
				{value}
			/>
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				{@html icon}
			</div>
		</div>
	{:else if isTextArea}
		<textarea
			class="form-textarea {baseClasses} {borderClasses}"
			{name}
			{placeholder}
			rows="3"
			{value}
		></textarea>
	{:else}
		<input class="form-input {baseClasses} {borderClasses}" {name} {type} {placeholder} {value} />
	{/if}

	{#if errorMessage}
		<span class="text-xs text-red-600 dark:text-red-400">
			{errorMessage}
		</span>
	{/if}

	{#if helperText && !errorMessage}
		<span class="text-xs text-gray-600 dark:text-gray-400">
			{helperText}
		</span>
	{/if}
</label>
