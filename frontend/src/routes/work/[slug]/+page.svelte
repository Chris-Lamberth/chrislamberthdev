<script>
	import { run } from 'svelte/legacy';

	import { imgUrl } from '$lib/sanity';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	let { data } = $props();

	let previousPost = $state(), currentPost = $state(), nextPost = $state();

	run(() => {
		if (data && data.posts && Array.isArray(data.posts.posts)) {
			const currentSlug = $page.params.slug;
			const posts = data.posts.posts;

			const currentIndex = posts.findIndex((p) => p.slug.current === currentSlug);

			if (currentIndex !== -1) {
				previousPost = posts[currentIndex - 1] || null;
				currentPost = posts[currentIndex] || null;
				nextPost = posts[currentIndex + 1] || null;
			}
		}
	});
</script>

<h1 class="hidden">{data.title}</h1>
<div class="post" in:fade={{ duration: 100, delay: 50 }} out:fade={{ duration: 50 }}>
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

		<!-- Main Image -->
		<!-- Main Image -->
		<section
			class="main-image border-1"
			style="background-image:url('{imgUrl(data.altHeaderImage?.asset || data.mainImage.asset)
				.format('webp', 'jpg')
				.url()}'); background-position: {data.altHeaderImage?.hotspot?.x * 100 ||
				data?.mainImage?.hotspot?.x * 100}% {data.altHeaderImage?.hotspot?.y * 100 ||
				data?.mainImage?.hotspot?.y * 100}%"
		></section>

		<!-- Rich Text -->
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

		<!-- Additional Images -->
		{#if data.additionalImages && data.additionalImages.length > 0}
			<section class="content_grid">
				{#each data.additionalImages as { image, alt, columns }}
					{#if image}
						<div class="img border-1" style="grid-column: span {columns}">
							<img
								src={imgUrl(image).url().endsWith('.gif')
									? imgUrl(image).url()
									: imgUrl(image).format('webp').url()}
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

		<!-- Banner Ads Section -->
		{#if data.adSets}
			<section class="banners">
				{#each data.adSets as adSet}
					<div class="set">
						{#if adSet.size728x90}
							<div>
								<div class="restart" data-size="728x90">
									<iframe
										loading="lazy"
										src={`/banner-ads/${adSet.name}/728x90/index.html`}
										frameborder="0"
										title={`${data.title} 728x90 Banner Ad`}
									></iframe>
								</div>
							</div>
						{/if}
						{#if adSet.size300x600}
							<div>
								<div class="restart" data-size="300x600">
									<iframe
										loading="lazy"
										src={`/banner-ads/${adSet.name}/300x600/index.html`}
										frameborder="0"
										title={`${data.title} 300x600 Banner Ad`}
									></iframe>
								</div>
							</div>
						{/if}
						{#if adSet.size160x600}
							<div>
								<div class="restart" data-size="160x600">
									<iframe
										loading="lazy"
										src={`/banner-ads/${adSet.name}/160x600/index.html`}
										frameborder="0"
										title={`${data.title} 160x600 Banner Ad`}
									></iframe>
								</div>
							</div>
						{/if}
						<div>
							{#if adSet.size300x250}
								<div class="restart" data-size="300x250">
									<iframe
										loading="lazy"
										src={`/banner-ads/${adSet.name}/300x250/index.html`}
										frameborder="0"
										title={`${data.title} 300x250 Banner Ad`}
									></iframe>
								</div>
							{/if}
							{#if adSet.size300x50}
								<div class="restart" data-size="300x50">
									<iframe
										loading="lazy"
										src={`/banner-ads/${adSet.name}/300x50/index.html`}
										frameborder="0"
										title={`${data.title} 300x50 Banner Ad`}
									></iframe>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</section>
		{/if}

		<!-- Link for client website -->
		{#if data.websiteLink}
			<section class="cta">
				<a href={data.websiteLink} rel="noopener noreferrer" target="_blank" class="btn"
					>view website</a
				>
			</section>
		{/if}
	</div>
</div>

<!-- Post Navigation -->
<section class="post_nav" in:fade={{ duration: 100, delay: 50 }} out:fade={{ duration: 50 }}>
	<div class="container">
		<hr />
		<nav>
			{#if previousPost}
				<div>
					<a class="previous line" href={`/work/${previousPost.slug.current}`}>
						<object
							class="arrow"
							data="/images/arrow.svg"
							type="image/svg+xml"
							aria-label="arrow"
						></object>
						previous
					</a>
				</div>
			{:else}
				<div>
					<span class="previous line disabled">
						<object
							class="arrow"
							data="/images/arrow.svg"
							type="image/svg+xml"
							aria-label="arrow"
						></object>
						previous
					</span>
				</div>
			{/if}
			<div>
				<a class="viewall line" href="/work">view all</a>
			</div>
			{#if nextPost}
				<div>
					<a class="next line" href={`/work/${nextPost.slug.current}`}>
						next
						<object
							class="arrow"
							data="/images/arrow.svg"
							type="image/svg+xml"
							aria-label="arrow"
						></object>
					</a>
				</div>
			{:else}
				<div>
					<span class="next line disabled">
						next
						<object
							class="arrow"
							data="/images/arrow.svg"
							type="image/svg+xml"
							aria-label="arrow"
						></object>
					</span>
				</div>
			{/if}
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
		color: var(--txt-color);
	}
	h3 {
		font-family: var(--display);
		font-size: 1.8rem;
		margin: 0 0 1em 0;
		color: var(--txt-color);
	}
	.info p {
		color: var(--txt-color);
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

	.cta .btn {
		margin: 0 0 3em 0;
	}
	.post_nav {
		margin: 2rem 0;
	}
	.post_nav nav {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
	}
	.post_nav nav > div:nth-child(1) {
		text-align: left;
	}
	.post_nav nav > div:nth-child(2) {
		text-align: center;
	}
	.post_nav nav > div:nth-child(3) {
		text-align: right;
	}
	.post_nav a,
	.post_nav span {
		font-family: var(--display);
		color: var(--txt-color);
		text-decoration: none;
		font-size: 1.4rem;
		line-height: 2em;
	}
	.post_nav .disabled {
		opacity: 0.2;
		pointer-events: none;
	}
	hr {
		border: none;
		height: 0.5px;
		background: var(--txt-color);
		border-radius: 4px;
		margin: 0 0 1rem 0;
		opacity: 0.2;
	}
	.post_nav .previous::after {
		translate: 0.8rem 0;
		scale: 0.8 1;
	}
	.post_nav .next::after {
		translate: -0.8rem 0;
		scale: 0.7 1;
	}

	.post_nav .arrow {
		translate: 0 0.2rem;
	}
	.post_nav .previous object {
		rotate: 180deg;
	}

	.banners .set {
		background: #ececec;
		border-radius: var(--radius);
		padding: 4rem 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		margin: 0 0 var(--gutter) 0;
	}
	:global([data-theme='dark']) .banners .set {
		background: #151515;
	}
	.banners .set > div {
		display: flex;
		gap: 1rem;
		flex-direction: column;
	}
	iframe {
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	[data-size='728x90'] {
		width: 728px;
		height: 90px;
		aspect-ratio: 728 / 90;
	}
	[data-size='300x600'] {
		width: 300px;
		height: 600px;
		aspect-ratio: 300 / 600;
	}
	[data-size='160x600'] {
		width: 160px;
		height: 600px;
		aspect-ratio: 160 / 600;
	}
	[data-size='300x250'] {
		width: 300px;
		height: 250px;
		aspect-ratio: 300 / 250;
	}
	[data-size='300x50'] {
		width: 300px;
		height: 50px;
		aspect-ratio: 300 / 50;
	}
	@media (width <= 840px) {
		[data-size='728x90'] {
			display: none;
		}
		.banners .set div:has(:global([data-size='728x90'])) {
			display: none;
		}
	}
	.restart {
		cursor: url('/images/refresh.png'), auto;
	}
	.restart:active iframe {
		display: none;
	}
	@media (width <= 600px) {
		.btn {
			width: 100%;
			padding: 1.4rem;
		}
	}
</style>
