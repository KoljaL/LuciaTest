<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import CloseIcon from '$lib/svg/close.svelte';
	export let closeProfile: any;
	// import { onDestroy } from 'svelte';
	// onDestroy(() => console.log('destroyed'));

	import { getUser } from '@lucia-auth/sveltekit/client';
	const user = getUser();

	let profile: any;
	let profile1: any;

	onMount(async () => {
		const formData = new FormData();
		formData.append('userId', $user?.userId);

		const response = await fetch('/api/profile?/getProfile', {
			method: 'POST',
			body: formData
		});

		let data = await response.json();
		if (data.type === 'success') {
			profile = JSON.parse(JSON.parse(data.data));
			console.log($user);
			console.log(profile);
		}
	});
</script>

<div transition:fade class="wrapper">
	<div transition:fade class="profile">
		<span class="closeIcon" on:click={closeProfile} on:keypress={closeProfile}><CloseIcon /></span>
		<h3>Profile</h3>

		<h3>$user</h3>
		<pre class="code">
      <p>
        Name: {$user?.username}
        {JSON.stringify($user, null, 2)}
      </p>
      </pre>

		<h3>profile</h3>
		<pre class="code">
      <p>
        Name: {profile?.username}
      </p>
      {JSON.stringify(profile, null, 2)}
    </pre>
	</div>
</div>

<style>
	.wrapper {
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.9);
	}
	.profile {
		position: absolute;
		width: 90vw;
		height: 90vh;
		/* margin-inline: auto; */
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		background: var(--color-bg);
		border: 1px solid var(--color-bg-secondary);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow) var(--color-shadow);
		padding: 0.5rem 1rem;
		text-align: var(--justify-normal);
	}
	.closeIcon {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		cursor: pointer;
	}
	.closeIcon:hover {
		color: var(--color-link);
	}
</style>
