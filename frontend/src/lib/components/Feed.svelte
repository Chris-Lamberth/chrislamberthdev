<script>
	import { imgUrl } from '$lib/sanity';
	import { fly, fade } from 'svelte/transition';
	/**
	 * @typedef {Object} Props
	 * @property {any} [posts]
	 * @property {any} [limit]
	 * @property {boolean} [showFilter]
	 */

	/** @type {Props} */
	let { posts = [], limit = posts.length, showFilter = false } = $props();

	let categories = $derived([
		...new Set(posts.flatMap((post) => post.categories.map((category) => category.title)))
	]);

	let selectedCategory = $state('all');
	let dropdownOpen = $state(false);

	function selectCategory(category) {
		selectedCategory = category;
		dropdownOpen = false;
	}

	let filteredPosts = $derived(
		selectedCategory === 'all'
			? posts
			: posts.filter((post) =>
					post.categories.some((category) => category.title === selectedCategory)
				)
	);
</script>

{#if showFilter}
	<div class="filter-wrapper">
		<div class="filter">
			<div
				aria-label="Filter by category"
				role="button"
				tabindex="-1"
				class="dropdown {dropdownOpen ? 'active' : ''}"
				on:keydown={(e) => e.key === 'Escape' && (dropdownOpen = false)}
			>
				<button
					aria-label="Filter"
					class="filter-btn"
					on:click={() => (dropdownOpen = !dropdownOpen)}
				>
					{selectedCategory}
				</button>
				{#if dropdownOpen}
					<div class="dropdown-menu" out:fade={{ duration: 100 }}>
						<button
							class="item"
							tabindex="0"
							on:keydown={(e) => {
								if (e.key === 'Enter') selectCategory('all');
								if (e.key === 'Escape') dropdownOpen = false;
							}}
							on:click={() => selectCategory('all')}
						>
							all
						</button>
						{#each categories as category}
							<button
								class="item"
								tabindex="0"
								on:click={() => selectCategory(category)}
								on:keydown={(e) => {
									if (e.key === 'Enter') selectCategory(category);
									if (e.key === 'Escape') dropdownOpen = false;
								}}
							>
								{category}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<div class="group">
	{#each filteredPosts.slice(0, limit) as post, index}
		<a
			href={`/work/${post.slug.current}`}
			in:fly={{ duration: 100, y: 50, delay: (index + 1) * 30 }}
		>
			<div
				class="img border-1"
				style="background-image: url({imgUrl(post.mainImage.asset)
					.width(600)
					.format('webp', 'jpg')
					.url()}); 
           background-position: {post?.mainImage?.hotspot?.x * 100}% {post?.mainImage?.hotspot?.y *
					100}%"
			></div>
			<div class="txt">
				<h3>{post.title}</h3>
				{#if post.categories}
					<p class="categories">
						{#each post.categories as category, index}
							<span>{category.title}{index < post.categories.length - 1 ? ', ' : ''}</span>
						{/each}
					</p>
				{/if}
			</div>
		</a>
	{/each}
</div>

<style>
	.group {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 2rem;
	}
	.img {
		height: 15vw;
		max-height: 200px;
		overflow: hidden;
		border-radius: var(--radius);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		box-shadow:
			0 0 0 0 var(--bg-color),
			0 0 0 0px var(--txt-color);
		transition: box-shadow 0.1s ease-in-out;
	}
	.txt {
		padding: 0.5rem 0 0 1rem;
	}
	a {
		text-decoration: none;
		color: var(--txt-color);
		outline: none;
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
	h3 {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		margin: 0.5em 0 0.3em 0;
	}
	.categories {
		line-height: 0.8em;
	}
	.categories span {
		font-size: 0.7rem;
		color: var(--txt-color);
		opacity: 0.6;
		display: inline-block;
		margin: 0 0.4em 0 0;
	}
	@media (width <= 600px) {
		.group {
			grid-gap: 2rem;
			grid-template-columns: 1fr;
		}
		.img {
			height: 15rem;
		}
		.txt {
			padding: 0.5rem 0 0 0.5rem;
		}
	}
	.filter-wrapper {
		text-align: right;
	}
	.filter {
		text-align: right;
		margin: 0 0 1rem auto;
		display: inline-block;
		position: relative;
	}
	.filter::after {
		content: '';
		position: absolute;
		inset: 50% 0 auto auto;
		width: 1.6rem;
		height: 1.6rem;
		background: var(--color-accent);
		border-radius: 30rem;
		z-index: 11;
		translate: 0 -50%;
		scale: 0;
		transition: scale 0.2s ease;
	}

	.filter:has(:global(.active))::after {
		scale: 1;
	}

	.filter:hover::after,
	.filter:focus-within::after {
		scale: 1;
	}

	.filter-btn {
		background: transparent;
		border: none;
		font-family: var(--body);
		font-size: 1rem;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-image: url('/images/icon_filter.svg');
		background-repeat: no-repeat;
		background-position: right 5px center;
		background-size: 1rem;
		text-align: right;
		padding: 0 2rem 0 0;
		cursor: pointer;
		outline: none;
		z-index: 12;
		position: relative;
		transition: background 0.1s ease;
	}
	.filter-btn:active {
		background-size: 0.9rem;
		background-position: right 6px center;
	}

	.dropdown-menu {
		position: absolute;
		background: #000;
		inset: -0.7rem -0.5rem auto auto;
		z-index: 10;
		padding: 3rem 2rem 2rem 2rem;
		border-radius: var(--radius) 1.2rem var(--radius) var(--radius);
		animation: circle 0.4s ease;
	}
	/* animation */
	@keyframes circle {
		0% {
			-webkit-clip-path: circle(0.5% at 92% 1.3rem);
			clip-path: circle(0.5% at 92% 1.3rem);
		}
		100% {
			-webkit-clip-path: circle(200% at 92% 1.3rem);
			clip-path: circle(200% at 92% 1.3rem);
		}
	}

	.dropdown-menu .item {
		font-size: 1.1rem;
		font-family: var(--body);
		cursor: pointer;
		white-space: nowrap;
		color: #fff;
		transform-origin: center center;
		transition: scale 0.1s ease;
		display: block;
	}
	.dropdown-menu .item:not(:last-child) {
		margin: 0 0 0.7rem 0;
	}
	.dropdown-menu .item:hover,
	.dropdown-menu .item:focus-within {
		color: var(--color-accent);
		outline: none;
		scale: 1.05;
	}

	/* dark mode */

	:global([data-theme='dark']) .filter-btn {
		filter: invert();
	}
	:global([data-theme='dark']) .dropdown-menu {
		border: var(--color-accent) 1px solid;
	}
	:global([data-theme='dark']) .filter .active .filter-btn {
		color: #000;
		filter: none;
	}
	:global([data-theme='dark']) .filter:hover .filter-btn {
		color: #fff;
		filter: none;
	}
	:global([data-theme='dark']) .filter:hover .active .filter-btn {
		color: #000;
	}
</style>
