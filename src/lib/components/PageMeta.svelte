<script lang="ts">
	import { conf } from '$lib/envStore';
	var metaBase: string = conf.base;
	var metaUrl: string = conf.url;
	var icon: string = conf.icon;
	// import { base } from '$app/paths';
	// base(path) is defined in confic and empty for dev env
	// so this is a simple switch to build mode
	// if (base.length !== 0) {
	// 	metaBase = 'https://dev.rasal.de/WebDevWiki/';
	// 	metaUrl = 'https://dev.rasal.de/WebDevWiki';
	// 	icon = 'WDW-icon.svg';
	// }
	export let meta: any;
	const default_meta: Object = {
		title: 'WebDevWiki',
		description: 'This is the Wiki for WebDeveloper',
		coverWidth: '60px',
		coverHeight: '60px',
		image: 'WDW-icon.svg',
		slug: '',
		url: metaUrl
	};
	meta = { ...default_meta, ...meta };
	// console.log('meta',meta)
</script>

<svelte:head>
	<title>WDW - {meta.title}</title>
	<meta data-key="description" name="description" content={meta.date} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={meta.title} />
	<meta name="twitter:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta name="twitter:description" content={meta.description} />
	<meta property="og:image" content="{meta.url}/{meta.image}" />
	<meta property="og:image:width" content={meta.coverWidth} />
	<meta property="og:image:height" content={meta.coverHeight} />
	<meta name="twitter:image" content="{meta.url}/{meta.image}" />
	<meta property="og:url" content="{meta.url}/{meta.slug}/" />
	<link rel="icon" href="{meta.url}/{icon}" />

	<base href={metaUrl} />
</svelte:head>
