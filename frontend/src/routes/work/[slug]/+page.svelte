<script>
	export let data;
	import { imgUrl } from '$lib/sanity';
	console.log(data.posts);
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
		{#if data.websiteLink}
			<section class="cta">
				<a href={data.websiteLink} target="_blank" class="btn">view website</a>
			</section>
		{/if}
	</div>
</div>

<section class="post_nav">
	<div class="container">
		<hr />
		<nav>
			<a class="previous line" href="#">
				<object class="arrow" data="/images/arrow.svg" type="image/svg+xml" aria-label="arrow" />
				previous
			</a>
			<a class="line view_all" href="/work">view all</a>
			<a class="next line" href="#"
				>next <object
					class="arrow"
					data="/images/arrow.svg"
					type="image/svg+xml"
					aria-label="arrow"
				/>
			</a>
		</nav>
	</div>
</section>

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
	.cta {
		text-align: center;
	}
	.btn {
		padding: 1em 2em;
		background: #000;
		border-radius: 0.6em;
		display: inline-block;
		color: #fff;
		text-decoration: none;
	}
	.btn:hover {
		background: #272727;
	}
	.cta .btn {
		margin: 0 0 3em 0;
	}
	.post_nav {
		margin: 2rem 0;
	}
	.post_nav nav {
		display: flex;
		justify-content: space-between;
	}
	.post_nav a {
		font-family: var(--serif);
		color: #000;
		text-decoration: none;
		font-size: 1.4rem;
	}
	hr {
		border: none;
		height: 1px;
		background: var(--gray-100);
		border-radius: 4px;
		margin: 0 0 1rem 0;
	}
	.post_nav .previous::after {
		translate: 0.8rem 0;
		scale: 0.8 1;
	}
	.post_nav .next::after {
		translate: -0.8rem 0;
		scale: 0.7 1;
	}
	.post_nav .view_all {
		margin: 0 0 0 -2em;
	}
	.post_nav .arrow object {
		translate: 0 0.2rem;
	}
	.post_nav .previous object {
		rotate: 180deg;
	}
</style>
