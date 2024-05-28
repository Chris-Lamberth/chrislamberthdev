<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let currentPath;
	$: currentPath = $page.url.pathname;
	$: isInteriorPage = currentPath == '/';
	$: pageName = $page.url.pathname.split('/')[1];

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');

		if (typeof window !== 'undefined') {
			gsap.registerPlugin(ScrollTrigger);

			const layers = document.querySelectorAll('.bg .layer');

			layers.forEach((layer, index) => {
				gsap.to(layer, {
					yPercent: -20 * (index + 1),
					ease: 'power1.out',

					scrollTrigger: {
						trigger: '.bg',
						start: 'top top',
						end: 'bottom top',
						scrub: true
					}
				});
			});
		}
	});

	import { initializeTheme } from '$lib/theme.js';

	// Initialize the theme when the component mounts
	initializeTheme();
</script>

<svelte:head>
	<title
		>{!isInteriorPage === false
			? 'Chris Lamberth ⚡ chrislamberth.dev'
			: `${pageName} ⚡ chrislamberth.dev`}</title
	>
	<meta name="theme-color" content="#00ffcc" />
</svelte:head>

<div class="bg">
	<div class="layer" />
	<div class="layer" />
	<div class="layer" />
</div>
<div class="wrapper">
	<Nav />
	<main>
		<div class="spacer" class:int={!isInteriorPage} />
		<slot />
	</main>
	<Footer />
</div>

<style>
	.wrapper {
		overflow-x: hidden;
	}

	main {
		position: relative;
		min-height: calc(100vh - 12.34rem);
		transition: filter 0.26s ease;
	}
	.spacer {
		height: 16rem;
		transition: height 0.4s var(--easing-1);
	}
	.spacer.int {
		height: 4rem;
	}
	@media (max-width: 680px) {
		.spacer {
			height: 18rem;
		}
	}
	.bg {
		position: fixed;
		inset: 0 0 auto 0;
		background: var(--bg-color);
		height: 100vh;
		transition: background 0.1s linear;
	}
	.bg::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		transition: background 0.1s linear;
	}
	.layer {
		position: absolute;
		inset: 0;
		transition: opacity 0.1s linear;
	}
	.layer:nth-child(1) {
		background: url('/images/layer3.svg') center top / cover no-repeat;
	}
	.layer:nth-child(2) {
		background: url('/images/layer2.svg') center top / cover no-repeat;
	}
	.layer:nth-child(3) {
		background: url('/images/layer1.svg') center top / cover no-repeat;
	}

	/* light theme */
	:global([data-theme='light']) .layer:nth-child(1) {
		opacity: 0.4;
	}
	:global([data-theme='light']) .layer:nth-child(2) {
		opacity: 0.6;
	}
	:global([data-theme='light']) .layer:nth-child(3) {
		opacity: 0.8;
	}
	:global([data-theme='light']) .bg::after {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 1) 50%);
	}

	/* dark theme */
	:global([data-theme='dark']) .layer:nth-child(1) {
		opacity: 0.06;
	}
	:global([data-theme='dark']) .layer:nth-child(2) {
		opacity: 0.07;
	}
	:global([data-theme='dark']) .layer:nth-child(3) {
		opacity: 0.08;
	}
	:global([data-theme='dark']) .bg::after {
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, rgb(0, 0, 0) 50%);
	}

	:global(body):has(.mobile-state-open) {
		overflow: hidden;
	}
	.wrapper:has(.mobile-state-open) main {
		pointer-events: none;
	}
</style>
