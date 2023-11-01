<script>
	import Feed from '$lib/components/Feed.svelte';
	export let data;
	const { posts } = data.posts;
</script>

<section class="container">
	<Feed {posts} />
</section>
