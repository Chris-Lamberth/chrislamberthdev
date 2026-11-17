<script>
	import { imgUrl } from '#lib/sanity.js';

	/**
	 * @typedef {object} Props
	 * @property {{ asset?: { _ref: string }, hotspot?: { x?: number, y?: number }, crop?: { top?: number, right?: number, bottom?: number, left?: number } }} image
	 * @property {string} alt
	 * @property {string | ((aspectRatio: number) => string)} sizes
	 * @property {boolean} [priority]
	 * @property {boolean} [cover]
	 * @property {boolean} [respectCrop]
	 */

	/** @type {Props} */
	let { image, alt, sizes, priority = false, cover = false, respectCrop = false } = $props();

	const candidateWidths = [
		240, 320, 400, 480, 600, 720, 850, 960, 1080, 1280, 1440, 1700, 1920, 2240, 2560, 2880, 3200,
		3840
	];

	let asset = $derived(image.asset);
	let dimensions = $derived(asset?._ref.match(/^image-.+-(\d+)x(\d+)-([a-z0-9]+)$/i));
	let crop = $derived(respectCrop ? image.crop : undefined);
	let sourceWidth = $derived(Number(dimensions?.[1]));
	let sourceHeight = $derived(Number(dimensions?.[2]));
	let width = $derived(
		Math.round(sourceWidth * (1 - (crop?.right ?? 0)) - Math.round(sourceWidth * (crop?.left ?? 0)))
	);
	let height = $derived(
		Math.round(
			sourceHeight * (1 - (crop?.bottom ?? 0)) - Math.round(sourceHeight * (crop?.top ?? 0))
		)
	);
	let maxWidth = $derived(Math.min(typeof sizes === 'function' ? 3840 : 1920, width));
	let urls = $derived.by(() => {
		if (!asset || !(width > 0 && height > 0)) return null;
		const builder = imgUrl(crop ? { asset, crop } : asset);
		if (dimensions?.[3] === 'gif') return { src: builder.url(), srcset: undefined };

		/** @param {number} candidate */
		const sizedUrl = (candidate) => builder.width(candidate).fit('max').format('webp').url();
		const widths = [...candidateWidths.filter((candidate) => candidate < maxWidth), maxWidth];
		return {
			src: sizedUrl(Math.min(850, maxWidth)),
			srcset: widths.map((candidate) => `${sizedUrl(candidate)} ${candidate}w`).join(', ')
		};
	});
</script>

{#if urls}
	<img
		class:cover
		src={urls.src}
		srcset={urls.srcset}
		sizes={typeof sizes === 'function' ? sizes(width / height) : sizes}
		{width}
		{height}
		{alt}
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : undefined}
		decoding={priority ? undefined : 'async'}
		style:object-position={`${(image.hotspot?.x ?? 0.5) * 100}% ${(image.hotspot?.y ?? 0.5) * 100}%`}
	/>
{/if}

<style>
	img {
		display: block;
		width: 100%;
		height: auto;
	}
	.cover {
		height: 100%;
		object-fit: cover;
	}
</style>
