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
<Nav />
<div class="wrapper" class:int={!isInteriorPage}>
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.wrapper {
		translate: 0 16rem;
		transition: translate 0.3s var(--easing-1);
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		min-height: 95vh;
	}
	.wrapper.int {
		translate: 0 2rem;
	}
	@media (max-width: 680px) {
		.wrapper {
			translate: 0 18rem;
		}
	}
	.bg {
		position: fixed;
		inset: 0;
		background: #e8e8e8;
	}
	.bg::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 1) 50%);
	}
	.layer {
		position: absolute;
		inset: 0;
	}
	.layer:nth-child(1) {
		background: url('../images/layer3.svg') center top / cover no-repeat;
		opacity: 0.4;
	}
	.layer:nth-child(2) {
		background: url('../images/layer2.svg') center top / cover no-repeat;
		opacity: 0.6;
	}
	.layer:nth-child(3) {
		background: url('../images/layer1.svg') center top / cover no-repeat;
		opacity: 0.8;
	}
</style>
