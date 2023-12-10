<script>
	import { imgUrl } from '$lib/sanity';
	export let posts = [];
	export let limit = posts.length;
	export let showFilter = false;

	let categories = [];
	posts.forEach((post) => {
		post.categories.forEach((category) => {
			if (!categories.includes(category.title)) {
				categories.push(category.title);
			}
		});
	});

	let selectedCategory = 'all';

	$: filteredPosts =
		selectedCategory === 'all'
			? posts
			: posts.filter((post) =>
					post.categories.some((category) => category.title === selectedCategory)
			  );
</script>

{#if showFilter}
	<div class="filter-wrapper">
		<div class="filter">
			<select bind:value={selectedCategory}>
				<option value="all">All</option>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>
	</div>
{/if}

<div class="group">
	{#each filteredPosts.slice(0, limit) as post}
		<a href={`work/${post.slug.current}`}>
			<div
				class="img border-1"
				style="background-image: url({imgUrl(post.mainImage.asset)
					.width(600)
					.format('webp', 'jpg')
					.url()}); 
           background-position: {post?.mainImage?.hotspot?.x * 100}% {post?.mainImage?.hotspot?.y *
					100}%"
			/>
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
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 1), 0 0 0 0px #000;
		transition: box-shadow 0.1s ease-in-out;
	}
	.txt {
		padding: 0.5rem 0 0 1rem;
	}
	a {
		text-decoration: none;
		color: #000;
		outline: none;
	}
	a:hover .img {
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px #000;
	}
	a:focus .img {
		outline: none;
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px #000;
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
		color: #9f9f9f;
		display: inline-block;
		margin: 0 0.4em 0 0;
	}
	@media (width <= 600px) {
		.group {
			grid-gap: 1rem;
			grid-template-columns: 1fr 1fr;
		}
		.img {
			height: 8rem;
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
		z-index: 1;
		translate: 0 -50%;
		scale: 0;
		transition: scale 0.2s ease;
	}

	.filter select {
		background: transparent;
		border: none;
		font-family: var(--serif);
		font-size: 1rem;
		-webkit-appearance: none; /* for Chrome, Safari */
		-moz-appearance: none; /* for Firefox */
		appearance: none; /* for modern browsers */
		background-image: url('/images/icon_filter.svg');
		background-repeat: no-repeat;
		background-position: right 5px center;
		background-size: 1rem;
		text-align: right;
		padding: 0 2rem 0 0;
		cursor: pointer;
		outline: none;
		z-index: 2;
		position: relative;
	}

	.filter:focus-within::after,
	.filter:hover::after {
		scale: 1;
	}
</style>
