<script>
	import { onMount } from 'svelte';

	/** @type {{ src: string, poster: string, label: string }} */
	let { src, poster, label } = $props();

	/** @type {HTMLVideoElement | undefined} */
	let video = $state();

	onMount(() => {
		const player = video;
		if (!player) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let visible = false;

		const updatePlayback = () => {
			if (reducedMotion.matches) {
				if (player.hasAttribute('src')) {
					player.removeAttribute('src');
					player.load();
				}
			} else if (visible) {
				if (!player.hasAttribute('src')) player.src = src;
				void player.play().catch(() => {});
			} else {
				player.pause();
			}
		};

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			updatePlayback();
		});

		observer.observe(player);
		reducedMotion.addEventListener('change', updatePlayback);

		return () => {
			observer.disconnect();
			reducedMotion.removeEventListener('change', updatePlayback);
			player.pause();
		};
	});
</script>

<video bind:this={video} aria-label={label} {poster} preload="none" muted loop playsinline></video>

<style>
	video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
