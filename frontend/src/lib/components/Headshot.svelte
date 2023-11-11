<script>
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	let currentPath;

	$: currentPath = $page.url.pathname;
	$: isInteriorPage = currentPath !== '/';

	let bgElement; // This will hold our .bg element reference

	onMount(() => {
		function handleMouseMove(event) {
			const { clientX, clientY, target } = event;
			const { innerWidth, innerHeight } = window;

			const xPercent = (clientX / innerWidth - 0.5) * -2;
			const yPercent = (clientY / innerHeight - 0.5) * -2;

			const maxTranslate = 30; // Maximum translation for the bg element in pixels

			const translateX = xPercent * maxTranslate;
			const translateY = yPercent * maxTranslate;

			// Apply the transformation
			bgElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
		}

		window.addEventListener('mousemove', handleMouseMove);

		// Cleanup the event listener when the component is destroyed
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<a href="/" class="img" class:int={isInteriorPage}>
	<div bind:this={bgElement} class="bg" />
	<div class="headshot" />
</a>

<style>
	.img {
		width: 30vw;
		max-width: 20rem;
		height: 12rem;
		overflow: hidden;
		border-radius: 30rem;
		position: absolute;
		inset: 6rem auto auto 0;
		transition: width 0.22s 0.05s var(--easing-1), height 0.22s 0.05s var(--easing-1),
			inset 0.22s 0.05s var(--easing-1), translate 0.22s 0.05s var(--easing-1);
	}
	.img.int {
		width: 2.8rem;
		height: 2.8rem;
		inset: 50% 0 auto 0;
		translate: 0 -50%;
	}
	.headshot {
		position: absolute;
		inset: 0;
		translate: 0 1rem;
		background: url('../images/headshot/chris.jpg') center center / contain no-repeat;
		mask: url('../images/headshot/mask.png') center center / contain no-repeat;
		-webkit-mask: url('../images/headshot/mask.png') center center / contain no-repeat;
		transition: translate 0.22s var(--easing-1);
	}
	.int .headshot {
		inset: -0.5rem -1rem -1rem -1rem;
	}
	.bg {
		position: absolute;
		inset: -2rem;
		translate: 0 0;
		background: url(../images/headshot/bg.jpg) center center / cover no-repeat;
	}
</style>
