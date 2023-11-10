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

	// page transitions
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// Tweened values for width and height
	const imgSize = tweened(320, {
		duration: 400,
		easing: cubicOut
	});

	$: if (isInteriorPage) {
		imgSize.set(50); // Assuming 32 is the new size for interior pages
	} else {
		imgSize.set(200); // Assuming 320 is the size for the home page
	}
</script>

<a
	href="/"
	class="img"
	class:int={isInteriorPage}
	style="width: {$imgSize}px; height: {$imgSize}px;"
>
	<div bind:this={bgElement} class="bg" />
	<div class="headshot" />
</a>

<style>
	.img {
		flex: 1;
		width: 100vw;
		max-width: 20rem;
		aspect-ratio: 1;
		position: relative;
		overflow: hidden;
		border-radius: 30rem;
		aspect-ratio: 3/2;
	}
	.img.int {
		width: 3.2rem;
		height: 3.2rem;
		aspect-ratio: unset;
		margin: -3.2rem 0;
	}
	.headshot {
		position: absolute;
		inset: 0;
		translate: 0 1rem;
		background: url('../images/headshot/chris.jpg') center center / contain no-repeat;
		mask: url('../images/headshot/mask.png') center center / contain no-repeat;
		-webkit-mask: url('../images/headshot/mask.png') center center / contain no-repeat;
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

	@media (width <= 790px) {
		.img {
			max-width: 40vw;
		}
	}
	@media (width <= 675px) {
		.img {
			max-width: 30vw;
		}
	}
</style>
