<script>
	import { imgUrl } from '$lib/sanity';
	export let instaPosts = [];
</script>

<div class="group">
	{#each instaPosts as post}
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
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 1), 0 0 0 0px #000;
		transition: box-shadow 0.1s ease-in-out;
	}
	a:hover .img {
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px #000;
	}
	a:focus .img {
		outline: none;
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px #000;
	}
	@media (width <= 600px) {
		.group {
			grid-template-columns: 1fr 1fr 1fr 1fr;
			gap: 1rem;
		}
	}
</style>
