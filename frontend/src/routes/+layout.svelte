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
<div class="wrapper" class:int={isInteriorPage}>
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.wrapper {
		translate: 0 4rem;
		display: block;
		transition: translate 0.3s var(--easing-1);
	}
	.wrapper.int {
		translate: 0 16rem;
	}
</style>
