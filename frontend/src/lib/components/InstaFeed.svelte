<script>
	import { tick } from 'svelte';
	import { safeExternalUrl } from '#lib/links.js';
	import SanityImage from './SanityImage.svelte';

	/** @typedef {import('#lib/sanity.types.ts').InstagramQueryResult} InstagramPosts */
	/** @typedef {InstagramPosts[number] & { url: string, image: NonNullable<InstagramPosts[number]['postImage']> }} Post */
	/** @typedef {{ id: number, posts: Post[] }} Batch */

	const rotationInterval = 4000;
	const fadeTime = 1100;
	const tileSizes =
		'(max-width: 600px) calc((100vw - 76px) / 2), (max-width: 800px) calc(((100vw - 60px - 2rem) * 5 / 12 - 1.5rem) / 2), calc(((min(100vw - 60px, 850px) - 3rem) * 5 / 12 - 1.5rem) / 2)';

	/** @type {{ instaPosts?: InstagramPosts, limit?: number }} */
	let { instaPosts = [], limit: limitProp = undefined } = $props();
	let posts = $derived(
		instaPosts.flatMap((post) => {
			const url = safeExternalUrl(post.postURLs);
			return url && post.postImage?.asset ? [{ ...post, url, image: post.postImage }] : [];
		})
	);
	let limit = $derived(limitProp ?? posts.length);
	let initial = $derived({ id: 0, posts: posts.slice(0, limit) });

	/** @type {Batch | undefined} */
	let displayed = $state();
	/** @type {Batch | undefined} */
	let inactive = $state();
	/** @type {HTMLDivElement | undefined} */
	let group = $state();
	let active = $derived(displayed ?? initial);
	let layers = $derived(
		inactive ? (inactive.id < active.id ? [inactive, active] : [active, inactive]) : [active]
	);

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
		const firstBatch = initial;
		const available = posts;
		const count = limit;
		const container = group;
		displayed = undefined;
		inactive = undefined;
		if (!container || count === 0 || available.length <= count) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let visible = false;
		let disposed = false;
		let preparing = false;
		let retiring = false;
		let sequence = 0;
		let currentBatch = firstBatch;
		/** @type {Batch | undefined} */
		let readyBatch;
		/** @type {ReturnType<typeof setTimeout> | undefined} */
		let retireTimer;

		async function prepareNext() {
			if (
				disposed ||
				!visible ||
				document.hidden ||
				reducedMotion.matches ||
				preparing ||
				readyBatch ||
				retiring
			)
				return;

			preparing = true;
			try {
				const shownImages = container?.querySelectorAll('.tiles.shown img') ?? [];
				await Promise.allSettled(
					Array.from(shownImages, (image) => /** @type {HTMLImageElement} */ (image).decode())
				);
				if (disposed || !visible || document.hidden || reducedMotion.matches) return;

				const shown = new Set(currentBatch.posts.map((post) => post._id));
				const remaining = available.filter((post) => !shown.has(post._id));
				const batch = {
					id: ++sequence,
					posts: shuffledPosts(remaining.length >= count ? remaining : available, count)
				};
				inactive = batch;
				await tick();
				if (disposed) return;

				const images = container?.querySelectorAll(`.tiles[data-batch="${batch.id}"] img`);
				if (images?.length !== batch.posts.length)
					throw new Error('Incomplete Instagram image set');
				await Promise.all(
					Array.from(images, (image) => /** @type {HTMLImageElement} */ (image).decode())
				);
				if (!disposed) readyBatch = batch;
			} catch {
				if (!disposed) inactive = undefined;
			} finally {
				preparing = false;
			}
		}

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) void prepareNext();
		});
		observer.observe(container);

		const interval = setInterval(() => {
			if (
				!visible ||
				document.hidden ||
				reducedMotion.matches ||
				container.matches(':focus-within, :hover')
			)
				return;
			if (!readyBatch) {
				void prepareNext();
				return;
			}

			inactive = currentBatch;
			currentBatch = readyBatch;
			displayed = currentBatch;
			readyBatch = undefined;
			retiring = true;
			retireTimer = setTimeout(() => {
				inactive = undefined;
				retiring = false;
				void prepareNext();
			}, fadeTime);
		}, rotationInterval);

		return () => {
			disposed = true;
			clearInterval(interval);
			clearTimeout(retireTimer);
			observer.disconnect();
		};
	});
</script>

<div class="group" bind:this={group}>
	{#each layers as layer (layer.id)}
		<div
			class="tiles"
			class:shown={layer.id === active.id}
			class:retiring={layer.id < active.id}
			data-batch={layer.id}
			inert={layer.id !== active.id}
		>
			{#each layer.posts as post (post._id)}
				<a aria-label="Instagram Post" href={post.url} target="_blank" rel="noopener noreferrer">
					<div class="img border-1">
						<SanityImage image={post.image} alt="" sizes={tileSizes} cover eager />
					</div>
				</a>
			{/each}
		</div>
	{/each}
</div>

<style>
	.group,
	.tiles {
		display: grid;
	}
	.tiles {
		grid-area: 1 / 1;
		gap: 1.5rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.tiles.shown {
		z-index: 1;
	}
	a {
		outline: none;
		opacity: 0;
		transition: opacity 0.5s linear;
	}
	.shown a,
	.retiring a {
		opacity: 1;
	}
	a:nth-child(2) {
		transition-delay: 0.2s;
	}
	a:nth-child(3) {
		transition-delay: 0.3s;
	}
	a:nth-child(4) {
		transition-delay: 0.6s;
	}
	.img {
		aspect-ratio: 1;
		overflow: hidden;
		border-radius: var(--radius);
		box-shadow:
			0 0 0 0 var(--bg-color),
			0 0 0 0px var(--txt-color);
		transition: box-shadow 0.1s ease-in-out;
	}
	a:hover .img,
	a:focus .img {
		box-shadow:
			0 0 0 2px var(--bg-color),
			0 0 0 4px var(--txt-color);
	}
	@media (width <= 600px) {
		.tiles {
			gap: 1rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}
</style>
