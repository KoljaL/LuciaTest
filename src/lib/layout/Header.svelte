<script lang="ts">
	import Auth from '$lib/layout/Auth.svelte';
	import Logo from '$lib/svg/logo.svelte';

	// import Login from '$lib/svg/login.svelte';
	// import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	// import { invalidateAll } from '$app/navigation';
	// const user = getUser();
	// $: console.log('Header $user', $user);
</script>

<header>
	<!-- <a class="logo" href="/"><Logo /><span>voard</span></a> -->
	<h1><a href="/">Lucia + SvelteKit demo</a></h1>

	<Auth />
</header>

<style>
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	header .logo {
		display: flex;
	}
	header .logo a:hover {
		filter: none;
	}
	:global(.logo svg) {
		height: 50px;
		width: auto;
	}
	header .logo span {
		color: var(--color-svelte);
		font-size: 2rem;
		font-weight: 600;
		margin-left: 0.15rem;
	}
</style>
