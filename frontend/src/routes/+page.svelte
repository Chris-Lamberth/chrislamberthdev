<script>
	import { onMount } from 'svelte';
	import Feed from '$lib/components/Feed.svelte';
	import InstaFeed from '$lib/components/InstaFeed.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import { fade } from 'svelte/transition';
	export let data;

	const { posts } = data.posts;
	const { instaPosts } = data.instaPosts;

	let windowWidth = 0;
	let postLimit = 6;

	function updateWidth() {
		windowWidth = window.innerWidth;
	}

	onMount(() => {
		window.addEventListener('resize', updateWidth);
		updateWidth();
	});

	$: {
		if (windowWidth < 600) {
			postLimit = 4;
		} else {
			postLimit = 6;
		}
	}
</script>

<section class="feed" in:fade={{ duration: 200 }} out:fade={{ duration: 50 }}>
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
			<Feed {posts} limit={postLimit} />
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
				<InstaFeed {instaPosts} limit={4} />
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
		color: var(--txt-color);
		text-decoration: none;
		font-size: 1.4rem;
		transition: scale 0.26s var(--easing-1);
	}
	.feed .txt a:active {
		scale: 0.9;
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

	/* dark mode */
	:global([data-theme='dark']) .arrow {
		filter: invert();
	}
</style>
