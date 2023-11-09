<script>
	import Feed from '$lib/components/Feed.svelte';
	import InstaFeed from '$lib/components/InstaFeed.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Headshot from '../lib/components/Headshot.svelte';

	export let data;
	const { posts } = data.posts;
	const { instaPosts } = data.instaPosts;
</script>

<section class="intro">
	<div class="container">
		<div class="group">
			<Headshot />

			<div class="txt">
				<div>
					<h1>Hello👋, I'm Chris</h1>
					<p>I design stuff & build websites</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="feed">
	<div class="container">
		<div class="txt">
			<h2 class="section-headline">some work</h2>
			<a class="line" href="./work"
				>more of it <object
					class="arrow"
					data="/images/arrow.svg"
					type="image/svg+xml"
					aria-label="arrow"
				/>
			</a>
		</div>
		{#if posts && posts.length}
			<Feed {posts} />
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
</section>

<section class="contact">
	<div class="container">
		<div class="group">
			<div class="insta">
				<h2 class="section-headline">insta feed</h2>
				<InstaFeed {instaPosts} />
			</div>
			<div class="form">
				<Contact />
			</div>
		</div>
	</div>
</section>

<style>
	.intro .group {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.intro .txt {
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	h1 {
		font-family: var(--serif);
		font-size: 3.1rem;
		line-height: 1em;
		margin: 0 0 0.2em 0;
	}
	.section-headline {
		padding-left: var(--inset-pad);
	}
	.arrow {
		margin-right: var(--inset-pad);
	}
	.intro .txt p {
		font-size: 1.8rem;
		line-height: 1.2em;
	}

	@media (width <= 790px) {
		h1 {
			font-size: 7vw;
		}
		.intro .txt p {
			font-size: 3.5vw;
		}
	}
	@media (width <= 675px) {
		.intro .group {
			flex-direction: column;
			gap: 3rem;
		}
		h1 {
			font-size: 3rem;
			text-align: center;
		}
		.intro .txt p {
			font-size: 1.8rem;
			text-align: center;
		}
	}

	.feed {
		margin: 4em 0;
	}
	.feed .txt {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin: 0 0 var(--headline-pad) 0;
	}
	.feed .txt a {
		font-family: var(--serif);
		color: #000;
		text-decoration: none;
		font-size: 1.4rem;
	}
	.feed .line::after {
		translate: -1.3rem 0;
		scale: 0.7 1;
	}
	.contact {
		margin: 0 0 3rem 0;
	}
	.contact .group {
		display: flex;
		align-items: flex-end;
		gap: 3rem;
	}

	.insta h2 {
		margin: 0 0 var(--headline-pad) 0;
	}
	.insta {
		flex: 5;
	}

	.form {
		flex: 7;
	}
	@media (width <= 800px) {
		.contact .group {
			gap: 2rem;
		}
	}
	@media (width <= 750px) {
		.contact .group {
			align-items: flex-start;
		}
	}
	@media (width <= 600px) {
		.contact .group {
			flex-direction: column-reverse;
			gap: 1rem;
		}
		.insta {
			flex: none;
			width: 100%;
		}
		.form {
			margin: 0 0 2rem 0;
		}
	}
</style>
