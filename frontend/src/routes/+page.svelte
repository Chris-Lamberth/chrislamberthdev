<script>
	import Feed from '$lib/components/Feed.svelte';
	import InstaFeed from '$lib/components/InstaFeed.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<section class="intro">
	<div class="container">
		<div class="group">
			<div class="img">
				<img src="images/chris-lamberth.jpg" alt="Chris Lamberth">
			</div>
			<div class="txt">
				<h1>Hello👋, I'm Chris</h1>
				<p>I design stuff & build websites</p>
			</div>
		</div>
	</div>
</section>

<section class="feed">
	<div class="container">
		<div class="txt">
			<h2 class="section-headline">some work</h2>
			<a href="./work">more of it <object class="arrow" data="/images/arrow.svg" type="image/svg+xml" aria-label="arrow"></object>
			</a>
		</div>
		<Feed />
	</div>
</section>

<section class="contact">
	<div class="container">
		<div class="group">
			<div class="insta">
				<h2 class="section-headline">insta feed</h2>
				<InstaFeed />
			</div>
			<div class="form">
				<Contact />
			</div>
		</div>
	</div>
</section>

<style>
	.intro .group{
		display:flex;
		align-items: center;
		justify-content: space-between;
	}
	.intro .img{
		max-width:20rem;
		border-radius:var(--radius);
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
	.section-headline{
		padding-left:var(--inset-pad);
	}
	.arrow{
		margin-right:var(--inset-pad);
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
	.feed{
		margin:4em 0;
	}
	.feed .txt{
		display:flex;
		justify-content: space-between;
		align-items: flex-end;
		margin:0 0 var(--headline-pad) 0;
	}
	.feed .txt a{
		font-family: var(--serif);
		color:#000;
		text-decoration:none;
		font-size:1.4rem;
	}
	.contact .group{
		display:flex;
		align-items: flex-end;
		gap:3rem;
	}
	
	.insta h2{
		margin: 0 0 var(--headline-pad) 0;
	}
	.insta{
		flex:5;
	}

	.form{
		flex:7;
	}
	@media (width <= 800px) {
		.contact .group{
			gap:2rem;
		}
	}
	@media (width <= 750px) {
		.contact .group{
			align-items: flex-start;
		}
	}
	@media (width <= 600px) {
		.contact .group{
			flex-direction:column-reverse;
			gap:1rem;
		}
		.insta{
			flex:none;
			width:100%;
		}
		.form{
			margin:0 0 2rem 0;
		}
	}

</style>