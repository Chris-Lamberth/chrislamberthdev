<script>
	import Feed from '$lib/components/Feed.svelte';
	export let data;
	const { posts } = data.posts;
	import { fade } from 'svelte/transition';
</script>

<section class="container" in:fade={{ duration: 100, delay: 50 }} out:fade={{ duration: 50 }}>
	<div class="wrapper">
		<Feed {posts} showFilter={true} />
	</div>
</section>

<style>
	.wrapper {
		padding: 0 0 3rem 0;
	}
</style>
