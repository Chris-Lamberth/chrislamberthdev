
<script>
	import { page } from '$app/stores';
</script>

<div class="container">
	<div class="wrapper">
		<div><p>error</p>
			<h1>{$page.status}</h1>
		<h2>{$page.error.message}</h2></div>
	<a href="/" class="btn">Home</a>
	</div>
</div>


<style>
	h1, h2, p{
		color:var(--txt-color);
	}
	h2{
		font-weight: 400;
		text-transform: lowercase;
	}
	.wrapper{
		text-align:center;
		display:flex;
		flex-direction:column;
		align-items: center;
		justify-content:center;
		gap:2rem;
	}
	
</style>