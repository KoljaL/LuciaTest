<script lang="ts">
	import UserIcon from '$lib/svg/user.svelte';
	import LoginIcon from '$lib/svg/logout.svelte';
	import LogoutIcon from '$lib/svg/login.svelte';
	import ProfileIcon from '$lib/svg/profile.svelte';
	import InputField from '$lib/components/InputField.svelte';

	import { fade } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { clickOutside } from '$lib/functions/clickOutside';
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';

	const user = getUser();
	let Profile: any;
	let signUpIn = true;
	let isExpanded = true;
	let errorMessage: String;
	let namevalue: string = 'peter';
	let passwordvalue: string = 'peter123';
	let emailvalue: string = 'peter@peter.org';
	function toggleSignUpIn(event: Event) {
		event.stopPropagation();
		signUpIn = !signUpIn;
	}

	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	function loadProfile() {
		import('./Profile.svelte').then((res) => (Profile = res.default));
	}

	// $: console.log('Header $user', $user);
	// $: console.log('Auth $user', $user);
	// $: console.log('Header $user', $user);
</script>

<svelte:component this={Profile} closeProfile={() => (Profile = false)} />

<div class="auth">
	<button
		on:click={(event) => {
			isExpanded = true;
			event.stopPropagation();
		}}
	>
		{#if $user}
			<UserIcon />
		{:else}
			<LoginIcon />
		{/if}
	</button>

	{#if isExpanded}
		<div
			class="login"
			transition:fade
			use:clickOutside={() => {
				isExpanded = false;
			}}
		>
			<!-- PROFILE / LOGOUT -->
			{#if $user}
				<div class="user">
					<h3>{$user.username}</h3>
					<button
						on:click={async () => {
							loadProfile();
							toggleExpand();
						}}><ProfileIcon /> Profile</button
					>
					<button
						on:click={async () => {
							await signOut();
							invalidateAll();
							toggleExpand();
						}}><LogoutIcon />Sign out</button
					>
				</div>
				<!-- LOGIN -->
			{:else if signUpIn}
				<form
					method="post"
					action="/api/auth?/signin"
					use:enhance={() => {
						errorMessage = '';
						return async ({ result }) => {
							if (result.type === 'failure') {
								errorMessage = result.data?.message || 'Sign In failed';
							}
							if (result.type === 'success') {
								invalidateAll();
								toggleExpand();
							}
						};
					}}
				>
					<InputField
						id="username"
						type="text"
						placeholder="must be unique"
						label={true}
						labelText="Username"
						required={true}
						bind:value={namevalue}
					/>

					<InputField
						id="password"
						type="password"
						placeholder="must be sectet"
						label={true}
						labelText="Password"
						required={true}
						bind:value={passwordvalue}
					/>
					<div style="display:flex; justify-content:space-between; align-items: center;">
						<input type="submit" value="Sign In" class="button" />
						<span class="signUpIn" on:click={toggleSignUpIn} on:keydown={toggleSignUpIn}
							>Sign Up</span
						>
					</div>
				</form>
				<!-- register -->
			{:else}
				<form
					method="post"
					action="/api/auth?/signup"
					use:enhance={() => {
						errorMessage = '';
						return async ({ result }) => {
							if (result.type === 'failure') {
								errorMessage = result.data?.message || 'Sign Up failed';
							}
							if (result.type === 'success') {
								invalidateAll();
								toggleExpand();
							}
						};
					}}
				>
					<InputField
						id="username"
						type="text"
						placeholder="must be unique"
						label={true}
						labelText="Username"
						required={true}
						bind:value={namevalue}
					/>

					<InputField
						id="email"
						type="email"
						placeholder="must be unique"
						label={true}
						labelText="Email"
						required={true}
						bind:value={emailvalue}
					/>

					<InputField
						id="password"
						type="password"
						placeholder="must be sectet"
						label={true}
						labelText="Password"
						required={true}
						bind:value={passwordvalue}
					/>
					<div style="display:flex; justify-content:space-between; align-items: center;">
						<span class="signUpIn" on:click={toggleSignUpIn} on:keydown={toggleSignUpIn}
							>Sign In</span
						>
						<input type="submit" value="Sign Up" class="button" />
					</div>
				</form>
			{/if}

			{#if errorMessage}
				<p transition:fade class="error">{errorMessage}</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.auth {
		position: relative;
	}
	button {
		background-color: transparent;
		border: none;
		color: var(--color-link);
		padding: 0;
		display: flex;
		gap: 0.5rem;
		/* text-align: left; */
	}
	.login {
		position: absolute;
		top: 2.5rem;
		right: 0;
		background-color: var(--color-bg);
		width: max-content;
	}

	form {
		padding: 1rem;
		width: 200px;
	}

	form .button {
		padding: 0.5rem 1rem;
	}

	.signUpIn {
		color: var(--color-link);
		cursor: pointer;
	}

	.signUpIn:hover {
		filter: brightness(var(--hover-brightness));
	}

	.user {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-bg-secondary);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow) var(--color-shadow);
		padding: 0.5rem 1rem;
		text-align: var(--justify-normal);
	}
	.user h3 {
		margin: 0;
		margin-left: 0.25rem;
		margin-bottom: 0.25rem;
	}

	.error {
		font-size: 0.8rem;
		color: brown;
	}
</style>
