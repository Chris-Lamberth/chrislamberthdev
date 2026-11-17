<script>
	import SanityImage from './SanityImage.svelte';

	/** @type {{ portableText: import('@portabletext/svelte').CustomBlockComponentProps }} */
	let { portableText } = $props();
	let image = $derived(portableText.value);
</script>

{#if typeof image.asset?._ref === 'string'}
	<SanityImage
		image={{ asset: image.asset, hotspot: image.hotspot }}
		alt={typeof image.alt === 'string' ? image.alt : ''}
		sizes="auto, (max-width: 910px) calc(100vw - 60px), 850px"
	/>
{/if}
