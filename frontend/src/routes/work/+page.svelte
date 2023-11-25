<script>
	import Feed from '$lib/components/Feed.svelte';
	export let data;
	const { posts } = data.posts;
</script>

<section class="container">
	<div class="wrapper">
		<Feed {posts} />
	</div>
</section>

<style>
	.wrapper {
		padding: 0 0 3rem 0;
	}
</style>
