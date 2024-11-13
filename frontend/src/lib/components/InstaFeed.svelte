<script>
	import { imgUrl } from '$lib/sanity';

	let { instaPosts = [], limit = instaPosts.length } = $props();

	// State management
	let displayedPosts = $state(instaPosts.slice(0, limit));
	let nextPosts = $state([]);

	// Helper functions
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	function preloadNextPosts() {
		shuffleArray(instaPosts);
		nextPosts = instaPosts.slice(0, limit);
		// Preload images
		nextPosts.forEach((post) => {
			const img = new Image();
			img.src = imgUrl(post.imageUrl).width(400).format('webp', 'jpg').url();
		});
	}

	// Initial shuffle
	shuffleArray(instaPosts);

	// Effect for post rotation
	$effect.root(() => {
		if (typeof window !== 'undefined') {
			// Set initial displayed posts
			displayedPosts = instaPosts.slice(0, limit);

			// Initial preload
			preloadNextPosts();

			// Set up interval for rotating posts
			const interval = setInterval(() => {
				displayedPosts = nextPosts;
				preloadNextPosts();
			}, 4000);

			return () => clearInterval(interval);
		}
	});
</script>

<div class="group">
	{#each displayedPosts as post}
		<a aria-label="Instagram Post" href={post.postURLs} target="_blank">
			<div
				class="img border-1"
				style="background-image: url({imgUrl(post.imageUrl)
					.width(400)
					.format('webp', 'jpg')
					.url()})"
			></div>
		</a>
	{/each}
</div>

<style>
	.group {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: 1fr 1fr;
	}
	a {
		outline: none;
	}
	.group .img {
		aspect-ratio: 1;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center center;
		border-radius: var(--radius);
		box-shadow:
			0 0 0 0 var(--bg-color),
			0 0 0 0px var(--txt-color);
	}
	.group a:nth-child(1) .img {
		transition:
			box-shadow 0.1s ease-in-out,
			background 0.5s linear;
	}
	.group a:nth-child(2) .img {
		transition:
			box-shadow 0.1s ease-in-out,
			background 0.5s 0.2s linear;
	}
	.group a:nth-child(3) .img {
		transition:
			box-shadow 0.1s ease-in-out,
			background 0.5s 0.3s linear;
	}
	.group a:nth-child(4) .img {
		transition:
			box-shadow 0.1s ease-in-out,
			background 0.5s 0.6s linear;
	}
	a:hover .img {
		box-shadow:
			0 0 0 2px var(--bg-color),
			0 0 0 4px var(--txt-color);
	}
	a:focus .img {
		outline: none;
		box-shadow:
			0 0 0 2px var(--bg-color),
			0 0 0 4px var(--txt-color);
	}
	@media (width <= 600px) {
		.group {
			gap: 1rem;
		}
	}
</style>
