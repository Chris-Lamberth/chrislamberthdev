<script>
	import Feed from '#lib/components/Feed.svelte';
	import { fade } from 'svelte/transition';
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<h1 class="hidden">Chris' work</h1>
<section class="container" in:fade={{ duration: 200 }} out:fade={{ duration: 50 }}>
	<div class="wrapper">
		{#if data.posts?.length}
			<Feed posts={data.posts} showFilter={true} />
		{:else if data.posts}
			<p>No work to show yet.</p>
		{:else}
			<p>Work is temporarily unavailable.</p>
		{/if}
	</div>
</section>

<style>
	.wrapper {
		padding: 0 0 3rem 0;
	}
</style>
