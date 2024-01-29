<script>
	import { actionState } from '$lib/stores/common';

	export let message = '';

	$: isSuccess = $actionState.includes('Success');
</script>

<div class="mx-9">
	<div class={isSuccess ? 'success-message' : 'error-message'}>
		<div class="max-w-md p-4 mx-auto mt-12 text-white rounded shadow-md">
			<div class="flex items-center">
				<div>{message}</div>
			</div>
		</div>
	</div>
</div>

<style>
	.error-message {
		background-color: #b00020;
	}
	.success-message {
		background-color: #1c571e;
	}
</style>
