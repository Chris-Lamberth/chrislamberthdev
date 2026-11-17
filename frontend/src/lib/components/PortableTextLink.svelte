<script>
	import { safeExternalUrl } from '#lib/links.js';

	/** @type {{ portableText: import('@portabletext/svelte').MarkComponentProps, children?: import('svelte').Snippet }} */
	let { portableText, children } = $props();
	let href = $derived(
		safeExternalUrl(portableText.value?.href, ['https:', 'http:', 'mailto:', 'tel:'])
	);
</script>

{#if href}
	<a {href}>{@render children?.()}</a>
{:else}
	{@render children?.()}
{/if}
