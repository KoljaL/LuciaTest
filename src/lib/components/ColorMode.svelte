<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_LS_PRFX } from '$env/static/public';

	const localStorageKey = PUBLIC_LS_PRFX + '_colorMode';

	// import darkCode from '$lib/assets/dark-code.css';
	// import lightCode from '$lib/assets/light-code.css';
	/**
	 *
	 * get colorMode
	 *
	 */
	var switchToTheme: string = 'light';
	// check if environment is browser, otherwise there is no localStorage
	if (browser) {
		//
		// first check if colorMode isset in localStorage
		//
		if (window.localStorage.getItem(localStorageKey)) {
			document.documentElement.setAttribute(
				'data-theme',
				window.localStorage.getItem(localStorageKey) || ''
			);
			switchToTheme = window.localStorage.getItem(localStorageKey)!;
		}
		//
		// second check if color-scheme isset in browser
		//
		else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.setAttribute('data-theme', 'dark');
			window.localStorage.setItem(localStorageKey, 'dark');
			switchToTheme = 'dark';
		}
		//
		// last set colorMode to default value
		//
		else {
			document.documentElement.setAttribute('data-theme', switchToTheme);
			window.localStorage.setItem(localStorageKey, switchToTheme);
		}
	}
	/**
	 *
	 * set light and dark mode switch
	 *
	 */
	function colorMode() {
		switchToTheme =
			document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', switchToTheme);
		window.localStorage.setItem(localStorageKey, switchToTheme);
	}
	// make switchToTheme reactive
	$: switchToTheme;
</script>

<!-- <svelte:head>
	{#if switchToTheme === 'dark'}
		{@html `<` + `style>${darkCode}</style>`}
	{:else}
		{@html `<` + `style>${lightCode}</style>`}
	{/if}
</svelte:head> -->

<div id="theme-switch" on:click={colorMode} on:keydown={colorMode}>
	<div id="sun">
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke="#4A5568"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M12 3V4M12 20V21M21 12H20M4 12H3M18.364 18.364L17.6569 17.6569M6.34315 6.34315L5.63604 5.63604M18.364 5.63609L17.6569 6.3432M6.3432 17.6569L5.63609 18.364M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
			/></svg
		>
	</div>
	<div id="moon">
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke="#4A5568"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M20.3542 15.3542C19.3176 15.7708 18.1856 16.0001 17 16.0001C12.0294 16.0001 8 11.9706 8 7.00006C8 5.81449 8.22924 4.68246 8.64581 3.64587C5.33648 4.9758 3 8.21507 3 12.0001C3 16.9706 7.02944 21.0001 12 21.0001C15.785 21.0001 19.0243 18.6636 20.3542 15.3542Z"
			/></svg
		>
	</div>
</div>

<style>
	#theme-switch svg {
		cursor: pointer;
		width: 35px;
		height: 35px;
		padding: 0.25rem;
		vertical-align: bottom;
		stroke: var(--color-text);
	}
	#theme-switch svg:hover {
		stroke: var(--color-text-secondary);
	}
	:global([data-theme='dark'] #moon) {
		display: none;
	}
	:global([data-theme='light'] #sun) {
		display: none;
	}
</style>
