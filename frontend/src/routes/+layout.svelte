<script>
	import { page } from '$app/stores';
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let currentPath;
	$: currentPath = $page.url.pathname;
	$: isInteriorPage = currentPath == '/';
</script>

<Nav />
<div class="wrapper" class:int={!isInteriorPage}>
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.wrapper {
		translate: 0 16rem;
		transition: translate 0.3s var(--easing-1);
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		min-height: 95vh;
	}
	.wrapper.int {
		translate: 0 2rem;
	}
	@media (max-width: 680px) {
		.wrapper {
			translate: 0 18rem;
		}
	}
</style>
