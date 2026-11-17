<script>
	import { imgUrl } from '#lib/sanity.js';
	import { safeExternalUrl } from '#lib/links.js';
	import { PortableText } from '@portabletext/svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	let { data } = $props();

	let postIndex = $derived(
		data.posts?.findIndex((post) => post.slug.current === page.params.slug) ?? -1
	);
	let previousPost = $derived(postIndex > 0 ? data.posts[postIndex - 1] : null);
	let nextPost = $derived(postIndex >= 0 ? data.posts[postIndex + 1] : null);
	let headerImage = $derived(data.altHeaderImage?.asset ? data.altHeaderImage : data.mainImage);
	let categories = $derived(
		(data.categories ?? []).flatMap((category) => (category?.title ? [category.title] : []))
	);
	let bannerSets = $derived(
		(data.adSets ?? []).filter((set) => /^[a-zA-Z0-9_-]+$/.test(set?.name ?? ''))
	);
	let websiteUrl = $derived(
		safeExternalUrl(data.websiteLink, ['https:', 'http:', 'mailto:', 'tel:'])
	);
</script>

{#snippet bodyImage({ portableText })}
	{@const image = portableText.value}
	{#if image.asset}
		<img src={imgUrl(image).url()} alt={image.alt ?? ''} />
	{/if}
{/snippet}

{#snippet bodyLink({ portableText, children })}
	{@const href = safeExternalUrl(portableText.value.href, ['https:', 'http:', 'mailto:', 'tel:'])}
	{#if href}
		<a {href}>{@render children?.()}</a>
	{:else}
		{@render children?.()}
	{/if}
{/snippet}

<h1 class="hidden">{data.title}</h1>
<div class="post" in:fade={{ duration: 100, delay: 50 }} out:fade={{ duration: 50 }}>
	<div class="container">
		<section class="info">
			<h2 class="hl_sm">client</h2>
			<h3>{data.title}</h3>
			<h2 class="hl_sm">services</h2>
			{#if categories.length}
				<p>{categories.join(', ')}</p>
			{/if}
		</section>

		<!-- Main Image -->
		{#if headerImage?.asset}
			<div
				class="main-image border-1"
				style:background-image={`url('${imgUrl(headerImage.asset).format('webp').url()}')`}
				style:background-position={`${(headerImage.hotspot?.x ?? 0.5) * 100}% ${(headerImage.hotspot?.y ?? 0.5) * 100}%`}
			></div>
		{/if}

		<!-- Rich Text -->
		{#if data.body}
			<section class="rich_text">
				<PortableText
					value={data.body}
					components={{ types: { image: bodyImage }, marks: { link: bodyLink } }}
				/>
			</section>
		{/if}

		<!-- Additional Images -->
		{#if data.additionalImages && data.additionalImages.length > 0}
			<section class="content_grid">
				{#each data.additionalImages as { image, alt, columns }, i (i)}
					{#if image?.asset}
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
		{#if bannerSets.length}
			<section class="banners">
				{#each bannerSets as adSet (adSet._key)}
					<div class="set">
						{#each ['728x90', '300x600', '160x600', '300x250', '300x50'] as size (size)}
							{#if adSet[`size${size}`]}
								<div>
									<div class="restart" data-size={size}>
										<iframe
											loading="lazy"
											sandbox=""
											src={`/banner-ads/${adSet.name}/${size}/index.html`}
											frameborder="0"
											title={`${data.title} ${size} Banner Ad`}
										></iframe>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				{/each}
			</section>
		{/if}

		<!-- Link for client website -->
		{#if websiteUrl}
			<section class="cta">
				<a href={websiteUrl} rel="noopener noreferrer" target="_blank" class="btn">view website</a>
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
					<a class="previous line" href={`/work/${encodeURIComponent(previousPost.slug.current)}`}>
						<object class="arrow" data="/images/arrow.svg" type="image/svg+xml" aria-label="arrow"
						></object>
						previous
					</a>
				</div>
			{:else}
				<div>
					<span class="previous line disabled">
						<object class="arrow" data="/images/arrow.svg" type="image/svg+xml" aria-label="arrow"
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
					<a class="next line" href={`/work/${encodeURIComponent(nextPost.slug.current)}`}>
						next
						<object class="arrow" data="/images/arrow.svg" type="image/svg+xml" aria-label="arrow"
						></object>
					</a>
				</div>
			{:else}
				<div>
					<span class="next line disabled">
						next
						<object class="arrow" data="/images/arrow.svg" type="image/svg+xml" aria-label="arrow"
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
