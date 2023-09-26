<script>
	export let data;
	import { imgUrl } from '$lib/sanity';
</script>

<section class="post">
	<div class="container">
		<div class="group">
			<div class="info">
				<h1>{data.title}</h1>
				{#if data.categories}
					<p class="categories">
						{#each data.categories as category, index}
							<span>{category.title}</span>
						{/each}
					</p>
				{/if}
			</div>
			<div
				class="main-image"
				style="background-image:url('{imgUrl(data.mainImage.asset)
					.format('webp', 'jpg')
					.url()}'); background-position: {data.mainImage.hotspot.x * 100}% {data.mainImage.hotspot
					.y * 100}%"
			/>
		</div>
		<div class="content" />
	</div>
</section>

<style>
	.post .group {
		display: flex;
	}
	.main-image {
		flex: 1;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: var(--radius);
		height: 20rem;
	}
	.info {
		flex: 1;
		margin: 0 0 3rem 0;
	}
	.categories {
		line-height: 0.8em;
	}
	.categories span {
		font-size: 1rem;
		color: #9f9f9f;
		display: inline-block;
		margin: 0 0.8em 0 0;
	}
</style>
