<script>
	export let data;
	import { imgUrl } from '$lib/sanity';
</script>

<h1 class="hidden">{data.title}</h1>
<div class="post">
	<div class="container">
		<section class="info">
			<h2 class="hl_sm">client</h2>
			<h3>{data.title}</h3>
			<h2 class="hl_sm">services</h2>
			{#if data.categories}
				<p>
					{#each data.categories as category, index}
						<span>{category.title}{index < data.categories.length - 1 ? ', ' : ''}</span>
					{/each}
				</p>
			{/if}
		</section>
		<div
			class="main-image"
			style="background-image:url('{imgUrl(data.mainImage.asset)
				.format('webp', 'jpg')
				.url()}'); background-position: {data.mainImage.hotspot.x * 100}% {data.mainImage.hotspot
				.y * 100}%"
		/>
		<div class="content">
			{#each data.body as item}
				{#if item._type === 'block'}
					<p>{item.children[0].text}</p>
				{:else if item._type === 'image'}
					<img src={imgUrl(item.asset).url()} alt={item.alt || 'Image'} />
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.main-image {
		flex: 1;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: var(--radius);
		height: 20rem;
	}
	.info {
		margin: 0 0 3rem 0;
		text-align: center;
	}
	h2 {
		margin: 0 0 0.5em 0;
	}
	h3 {
		font-family: var(--serif);
		font-size: 2rem;
		margin: 0 0 1em 0;
	}
</style>
