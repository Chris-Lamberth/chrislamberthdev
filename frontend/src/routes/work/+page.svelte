<script>
	import Feed from '$lib/components/Feed.svelte';
	export let data;
	const { posts } = data.posts;
	import { fade } from 'svelte/transition';
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
