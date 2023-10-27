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
			{#if data.body}
				{#each data.body as item}
					{#if item._type === 'block'}
						<p>{item.children[0].text}</p>
					{:else if item._type === 'image'}
						<img src={imgUrl(item.asset).url()} alt={item.alt || 'Image'} />
					{/if}
				{/each}
			{/if}
		</div>
		{#if data.additionalImages && data.additionalImages.length > 0}
			<section class="images">
				{#each data.additionalImages as { image, alt, columns }}
					{#if image}
						<div class="img" style="grid-column: span {columns}">
							<img
								src={imgUrl(image).url()}
								alt={alt || 'Image'}
								style="object-position: {image.hotspot
									? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
									: 'center'}"
							/>
						</div>
					{/if}
				{/each}
			</section>
		{/if}
	</div>
</div>

<style>
	.main-image {
		flex: 1;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: var(--radius);
		height: 30rem;
		margin: 0 0 2rem 0;
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
	.images {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 2rem;
	}
	.images .img {
		border-radius: var(--radius);
		overflow: hidden;
	}
	.images .img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
