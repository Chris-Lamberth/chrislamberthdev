<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let currentPath;
	$: currentPath = $page.url.pathname;
	$: isInteriorPage = currentPath == '/';

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
</script>

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
		min-height: calc(100vh - 13rem);
	}
	.spacer {
		height: 16rem;
		transition: height 0.4s var(--easing-1);
	}
	.spacer.int {
		height: 2rem;
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
	}
	.bg::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background: var(--bg-gradient);
	}
	.layer {
		position: absolute;
		inset: 0;
	}
	.layer:nth-child(1) {
		background: url('/images/layer3.svg') center top / cover no-repeat;
		opacity: var(--opacity-1);
	}
	.layer:nth-child(2) {
		background: url('/images/layer2.svg') center top / cover no-repeat;
		opacity: var(--opacity-2);
	}
	.layer:nth-child(3) {
		background: url('/images/layer1.svg') center top / cover no-repeat;
		opacity: var(--opacity-3);
	}
</style>
