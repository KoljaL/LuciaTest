<script lang="ts">
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	import '../app.css';
	import Header from '$lib/layout/Header.svelte';

	handleSession(page, (hasSession) => {
		console.log(hasSession);
	});
</script>

<svelte:head>
	<title>SvelteKit + Lucia + Prisma</title>
</svelte:head>

<Header />
<main>
	<slot />
</main>

<footer />
