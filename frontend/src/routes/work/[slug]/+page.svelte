<script>
	export let data;
	function formatDate(date){
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(date));
	}
</script>

<div class="container">
	<h1>{data.post.title}</h1>
	<h2>{formatDate(data.post.createAt)}</h2>
	<div class="content">
		{@html data.post.content}
	</div>
</div>
