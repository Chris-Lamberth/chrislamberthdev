<script>
	import { imgUrl } from '#lib/sanity.js';
	import { safeExternalUrl } from '#lib/links.js';

	let { instaPosts = [], limit: limitProp = undefined } = $props();
	let posts = $derived(
		instaPosts.flatMap((post) => {
			const url = safeExternalUrl(post.postURLs);
			return url && post.imageUrl
				? [{ ...post, url, image: imgUrl(post.imageUrl).width(400).format('webp').url() }]
				: [];
		})
	);
	let limit = $derived(limitProp ?? posts.length);

	let displayedPosts = $state();
	let group = $state();

	function shuffledPosts(posts, limit) {
		const array = [...posts];
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array.slice(0, limit);
	}

	function preloadNextPosts(posts, limit) {
		const nextPosts = shuffledPosts(posts, limit);
		for (const post of nextPosts) {
			const img = new Image();
			img.src = post.image;
		}
		return nextPosts;
	}

	$effect(() => {
		const currentPosts = posts;
		const count = limit;
		const container = group;
		displayedPosts = undefined;
		if (currentPosts.length <= count) return;

		let nextPosts = preloadNextPosts(currentPosts, count);
		const interval = setInterval(() => {
			if (container?.matches(':focus-within, :hover')) return;
			displayedPosts = nextPosts;
			nextPosts = preloadNextPosts(currentPosts, count);
		}, 4000);
		return () => clearInterval(interval);
	});
</script>

<div class="group" bind:this={group}>
	{#each displayedPosts ?? posts.slice(0, limit) as post, i (i)}
		<a aria-label="Instagram Post" href={post.url} target="_blank" rel="noopener noreferrer">
			<div class="img border-1" style:background-image={`url(${post.image})`}></div>
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
