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
	<div class="container" />
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
	.section-headline {
		padding-left: var(--inset-pad);
	}
	.arrow {
		margin-right: var(--inset-pad);
	}

	.feed {
		margin: 2.5em 0 4em 0;
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
