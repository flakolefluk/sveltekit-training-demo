<script lang="ts">
	import { page } from '$app/stores';

	export let formError: string = '';
	export let fieldErrors: {
		username: string | undefined;
		password: string | undefined;
	} = { username: undefined, password: undefined };
	export let fields: {
		loginType: string;
		username: string;
		password: string;
	};
</script>

<svelte:head>
	<title>SvelteKit Demo | Sign In</title>
	<meta name="description" content="Sign In to SvelteKit Demo" />
</svelte:head>

<div class="container">
	<div class="content" data-light="">
		<h1>Register</h1>
		<form
			class="auth"
			method="post"
			aria-describedby={formError ? 'form-error-message' : undefined}
		>
			<input
				type="hidden"
				name="redirectTo"
				value={$page.url.searchParams.get('redirectTo') ?? null}
			/>
			<div>
				<label for="username-input">Username</label>
				<input
					type="text"
					id="username-input"
					name="username"
					value={fields?.username ?? null}
					aria-invalid={Boolean(fieldErrors?.username)}
					aria-describedby={fieldErrors?.username ? 'username-error' : undefined}
				/>
				{#if fieldErrors?.username}
					<p class="form-validation-error" role="alert" id="username-error">
						{fieldErrors.username}
					</p>
				{/if}
			</div>
			<div>
				<label for="password-input">Password</label>
				<input
					id="password-input"
					name="password"
					value={fields?.password ?? null}
					type="password"
					aria-invalid={Boolean(fieldErrors?.password) || undefined}
					aria-describedby={fieldErrors?.password ? 'password-error' : undefined}
				/>
				{#if fieldErrors?.password}
					<p class="form-validation-error" role="alert" id="password-error">
						{fieldErrors.password}
					</p>
				{/if}
			</div>
			<div id="form-error-message">
				{#if formError}
					<p class="form-validation-error" role="alert">
						{formError}
					</p>
				{/if}
			</div>
			<button type="submit" class="button"> Submit </button>
		</form>
		<a href="login">Want to sign in?</a>
	</div>
</div>

<style>
	.container {
		min-height: inherit;
	}

	.container,
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.content {
		padding: 1rem;
		background-color: hsl(0, 0%, 100%);
		border-radius: 5px;
		box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.5);
		width: 400px;
		max-width: 100%;
	}

	@media print, (min-width: 640px) {
		.content {
			padding: 2rem;
			border-radius: 8px;
		}
	}

	h1 {
		margin-top: 0;
	}
</style>
