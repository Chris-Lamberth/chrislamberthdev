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
		<section
			class="main-image"
			style="background-image:url('{imgUrl(data.mainImage.asset)
				.format('webp', 'jpg')
				.url()}'); background-position: {data.mainImage.hotspot.x * 100}% {data.mainImage.hotspot
				.y * 100}%"
		/>
		{#if data.body}
			<section class="rich_text">
				{#each data.body as item}
					{#if item._type === 'block'}
						<p>{item.children[0].text}</p>
					{:else if item._type === 'image'}
						<img src={imgUrl(item.asset).url()} alt={item.alt || 'Image'} />
					{/if}
				{/each}
			</section>
		{/if}

		{#if data.additionalImages && data.additionalImages.length > 0}
			<section class="content_grid">
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
	:root {
		--gutter: 1.2rem;
	}
	.info {
		text-align: center;
		margin: 0 0 3rem 0;
	}
	.main-image {
		flex: 1;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: var(--radius);
		height: 30rem;
		margin: 0 0 var(--gutter) 0;
	}
	.rich_text {
		margin: 0 0 var(--gutter) 0;
	}
	h2 {
		margin: 0 0 0.5em 0;
	}
	h3 {
		font-family: var(--serif);
		font-size: 2rem;
		margin: 0 0 1em 0;
	}
	.content_grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: var(--gutter);
		margin: 0 0 3rem 0;
	}
	.content_grid .img {
		border-radius: var(--radius);
		overflow: hidden;
	}
	.content_grid .img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
