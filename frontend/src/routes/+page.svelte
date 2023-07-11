<script>
	import headshot from '$lib/images/chris-lamberth.jpg';
	import Feed from '$lib/components/Feed.svelte';
</script>

<div class="container">
	<div class="intro">
		<div class="img">
			<img src="{headshot}" alt="Chris Lamberth">
		</div>
		<div class="txt">
			<h1>Hello👋, I'm Chris</h1>
			<p>I design stuff & build websites</p>
		</div>
	</div>
</div>

<Feed />

<style>
	.intro{
		display:flex;
		align-items: center;
		justify-content: space-between;
	}
	.intro .img{
		max-width:20rem;
		border-radius:2rem;
		overflow:hidden;
		display: grid;
  		place-items: center;
	}
	.intro .img img{
		object-fit: cover;
	}
	.intro .txt{
		margin:0 0 0 3rem;
	}
	h1{
		font-family:var(--serif);
		font-size:3.5rem;
		line-height: 1em;
		margin:0 0 .2em 0;
	}
	.intro .txt p{
		font-size:1.8rem;
		line-height:1.2em;
	}

	@media (width <= 700px) {
		.intro .img{
			max-width:40vw;
		}
	}
	@media (width <= 600px) {
		h1{
			font-size:3rem;
		}
		.intro{
			flex-direction:column;
		}
		.intro .txt{
			margin:3rem 0 0 0;
			text-align:center;
		}
	}

</style>