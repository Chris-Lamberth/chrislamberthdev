<script>
	import { safeExternalUrl } from '#lib/links.js';
	import SanityImage from './SanityImage.svelte';
	/** @typedef {import('#lib/sanity.types.ts').InstagramQueryResult} InstagramPosts */
	/** @typedef {InstagramPosts[number] & { url: string, image: NonNullable<InstagramPosts[number]['postImage']> }} Post */

	/** @type {{ instaPosts?: InstagramPosts, limit?: number }} */
	let { instaPosts = [], limit: limitProp = undefined } = $props();
	let posts = $derived(
		instaPosts.flatMap((post) => {
			const url = safeExternalUrl(post.postURLs);
			return url && post.postImage?.asset ? [{ ...post, url, image: post.postImage }] : [];
		})
	);
	let limit = $derived(limitProp ?? posts.length);

	/** @type {Post[] | undefined} */
	let displayedPosts = $state();
	/** @type {HTMLDivElement | undefined} */
	let group = $state();

	/** @param {Post[]} posts @param {number} limit */
	function shuffledPosts(posts, limit) {
		const array = [...posts];
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array.slice(0, limit);
	}

	$effect(() => {
		const currentPosts = posts;
		const count = limit;
		const container = group;
		displayedPosts = undefined;
		if (!container || currentPosts.length <= count) return;

		let visible = false;
		const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
		observer.observe(container);
		const interval = setInterval(() => {
			if (!visible || document.hidden || container.matches(':focus-within, :hover')) return;
			displayedPosts = shuffledPosts(currentPosts, count);
		}, 4000);
		return () => {
			clearInterval(interval);
			observer.disconnect();
		};
	});
</script>

<div class="group" bind:this={group}>
	{#each displayedPosts ?? posts.slice(0, limit) as post (post._id)}
		<a aria-label="Instagram Post" href={post.url} target="_blank" rel="noopener noreferrer">
			<div class="img border-1">
				<SanityImage
					image={post.image}
					alt=""
					sizes="auto, (max-width: 600px) calc((100vw - 76px) / 2), 180px"
					cover
				/>
			</div>
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
		overflow: hidden;
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
