<script lang="ts">
	import Auth from '$lib/layout/Auth.svelte';
	import ColorMode from '$lib/components/ColorMode.svelte';
	// import Logo from '$lib/svg/logo.svelte';
</script>

<header>
	<!-- <a class="logo" href="/"><Logo /><span>voard</span></a> -->
	<h1><a href="/">SvelteKit + Lucia + Prisma</a></h1>

	<div class="right">
		<ColorMode />
		<Auth />
	</div>
</header>

<style>
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.right {
		display: flex;
	}

	/* header .logo {
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
	} */
</style>
