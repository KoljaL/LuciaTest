<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	// https://dev.to/mrityunjaypalled/playing-with-array-of-objects-in-javascript-1f48
	// https://freshman.tech/unsplash-search/
	import { base } from '$app/paths';
	// import { searchResults } from '$lib/components/search/store';
	// https://github.com/WebDevWiki/website/blob/main/src/lib/components/search/store.ts
	// export var data: any;
	// for dev env
	var Url: string = 'http://localhost:9090/';
	// base(path) is defined in confic and empty for dev env
	// so this is a simple switch to build mode
	if (base.length !== 0) {
		Url = 'https://dev.rasal.de/WebDevWiki/php/';
	}
	let timer: NodeJS.Timeout;
	async function handleInput(e: Event) {
		// console.log(e);
		let needle = (e.target as HTMLInputElement).value;
		needle = needle.replace(' ', '_');
		// console.log('needle', needle);
		if (needle.length >= 3) {
			clearTimeout(timer);
			timer = setTimeout(async () => {
				// fetchResults(needle);
				// goto(`search/${needle}`, { replaceState: false, keepfocus: true, noscroll: true });
				// history.pushState({ page: 1 }, needle, 'search/' + needle);
			}, 50);
		}
	}
	async function fetchResults(needle: string) {
		if (browser) {
			try {
				console.time('OldSearch');
				const res = await self.fetch(`${Url}search.php?search=${needle}`);
				if (res.ok) {
					const data = await res.json();
					//
					// sent data to store.ts
					// searchResults.set(data);
					console.timeEnd('OldSearch');
				} else {
					console.error('error else');
					console.log(`${Url}search.php?search=${needle}`);
					console.log(res);
				}
			} catch (error) {
				console.error('no item found', error);
			}
		}
	}
</script>

<div class="search-container">
	<input
		class="search"
		id="search"
		type="search"
		name="q"
		placeholder="Search"
		on:input={handleInput}
	/>
	<label class="search-icon" for="search">
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
		>
			<path
				d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
			/>
		</svg>
	</label>
	<label class="return-icon" for="submit">
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke="#4A5568"
			stroke-width="1"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="#4A5568"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M20 6a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 1-.29.71A1 1 0 0 1 17 12H8.08l2.69-3.39a1 1 0 0 0-1.52-1.17l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78.37 1 1 0 0 0 .62-.22 1 1 0 0 0 .15-1.41l-2.66-3.36h8.92a3 3 0 0 0 3-3z"
			/>
		</svg>
	</label>
</div>

<!-- STYLE -->
<style>
	:root {
		--search-border-radius: 0.4rem;
		--search-border-color: var(--border-color-sec);
		--search-text-color: var(--text-color);
		--search-icon-color: var(--text-color);
		--search-hover-color: var(--text-hover-color);
		--search-bg2-color: var(--bg-content);
		--search-bg1-color: var(--bg-tab);
		--search-bg3-color: var(--bg-main);
		--search-height: 35px;
		--search-width: 35px;
	}
	.search-container {
		position: relative;
		display: inline-block;
		height: var(--search-height);
		width: var(--search-width);
		vertical-align: bottom;
	}
	.return-icon svg,
	.search-icon svg {
		display: inline-block;
		position: absolute;
		width: 100%;
		margin: 0;
		padding: 0.25rem;
		border: 1px solid transparent;
		border-radius: var(--search-border-radius);
		height: var(--search-height);
		text-align: center;
		stroke: var(--search-text-color);
		cursor: pointer;
		-moz-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		transition-duration: 1s;
		-moz-transition-duration: 1s;
		-webkit-transition-duration: 1s;
		-o-transition-duration: 1s;
	}
	.return-icon svg:hover,
	.search-icon svg:hover {
		transition-duration: 0.4s;
		-moz-transition-duration: 0.4s;
		-webkit-transition-duration: 0.4s;
		-o-transition-duration: 0.4s;
		background-color: var(--search-bg1-color);
		stroke: var(--search-hover-color);
		border: 1px solid var(--search-border-color);
		border-radius: var(--search-border-radius);
	}
	.search:not(:placeholder-shown) ~ .return-icon svg,
	.search:focus + .search-icon svg {
		transition-duration: 0.4s;
		-moz-transition-duration: 0.4s;
		-webkit-transition-duration: 0.4s;
		-o-transition-duration: 0.4s;
		background-color: var(--search-bg1-color);
		border: 1px solid var(--search-border-color);
		border-left: 1px solid transparent;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.search {
		position: absolute;
		left: calc(var(--search-width) - 1px);
		background-color: transparent;
		color: var(--search-text-color);
		font-size: 0.9rem;
		border: none;
		border: 1px solid transparent;
		border-right: none;
		outline: none;
		padding: 0;
		width: 0;
		height: 100%;
		z-index: 10;
		transition-duration: 0.4s;
		-moz-transition-duration: 0.4s;
		-webkit-transition-duration: 0.4s;
		-o-transition-duration: 0.4s;
		left: auto;
		right: calc(var(--search-width) - 2px);
	}
	.search:not(:placeholder-shown),
	.search:focus {
		width: 263px;
		padding: 0 16px 0 0;
		padding: 0 0 0 16px;
		background: var(--search-bg2-color);
		border: 1px solid var(--search-border-color);
		border-right: none;
		border-top-left-radius: var(--search-border-radius);
		border-bottom-left-radius: var(--search-border-radius);
	}
	.return-icon {
		display: none;
	}
	.search:not(:placeholder-shown) ~ .search-icon {
		display: none;
	}
	.search:not(:placeholder-shown) ~ .return-icon {
		display: inline;
	}
</style>
