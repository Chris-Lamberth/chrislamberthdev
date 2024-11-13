<script>
	import Feed from '$lib/components/Feed.svelte';
	import { fade } from 'svelte/transition';
	let { data } = $props();
	const { posts } = data.posts;
</script>

<h1 class="hidden">Chris' work</h1>
<section class="container" in:fade={{ duration: 200 }} out:fade={{ duration: 50 }}>
	<div class="wrapper">
		<Feed {posts} showFilter={true} />
	</div>
</section>

<style>
	.wrapper {
		padding: 0 0 3rem 0;
	}
</style>
