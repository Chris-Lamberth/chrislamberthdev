<script>
	import { imgUrl } from '$lib/sanity';
	export let instaPosts = [];
	export let limit = instaPosts.length;
</script>

<div class="group">
	{#each instaPosts.slice(0, limit) as post}
		<a href={post.postURLs} target="_blank">
			<div
				class="img"
				style="background-image: url({imgUrl(post.imageUrl)
					.width(400)
					.format('webp', 'jpg')
					.url()})"
			/>
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
		box-shadow: 0 0 0 0 var(--bg-color), 0 0 0 0px var(--txt-color);
		transition: box-shadow 0.1s ease-in-out;
	}
	a:hover .img {
		box-shadow: 0 0 0 2px var(--bg-color), 0 0 0 4px var(--txt-color);
	}
	a:focus .img {
		outline: none;
		box-shadow: 0 0 0 2px var(--bg-color), 0 0 0 4px var(--txt-color);
	}
	@media (width <= 600px) {
		.group {
			gap: 1rem;
		}
	}
</style>
