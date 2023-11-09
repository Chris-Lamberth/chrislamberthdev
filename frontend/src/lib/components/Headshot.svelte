<script>
	import { onMount } from 'svelte';

	let bgElement; // This will hold our .bg element reference

	onMount(() => {
		function handleMouseMove(event) {
			const { clientX, clientY, target } = event;
			const { innerWidth, innerHeight } = window;

			const xPercent = (clientX / innerWidth - 0.5) * 2; // -1 to 1
			const yPercent = (clientY / innerHeight - 0.5) * 2; // -1 to 1

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

<div class="img">
	<div bind:this={bgElement} class="bg" />
	<div class="headshot" />
</div>

<style>
	.img {
		flex: 1;
		width: 100%;
		max-width: 20rem;
		aspect-ratio: 1;
		overflow: hidden;
		position: relative;
		border-radius: 50%;
	}
	.headshot {
		position: absolute;
		inset: 0;
		translate: 0 1rem;
		background: url('../images/headshot/chris.jpg') center center / contain no-repeat;
		mask: url('../images/headshot/mask.png') center center / contain no-repeat;
		-webkit-mask: url('../images/headshot/mask.png') center center / contain no-repeat;
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
