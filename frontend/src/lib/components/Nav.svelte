<script>
	import { page } from '$app/stores';
	let currentPath;

	$: currentPath = $page.url.pathname;
	$: homeActive = currentPath === '/';
	$: aboutActive = currentPath === '/about';
	$: resumeActive = currentPath === '/resume';
	$: workActive = currentPath === '/work';
</script>

<div class="bar">
	<div class="container">
		<div class="group">
			<nav>
				<a class="line" href="/" class:active={homeActive}>home</a>
				<a class="line" href="/about" class:active={aboutActive}>about</a>
				<a class="line" href="/resume" class:active={resumeActive}>resume</a>
				<a class="line" href="/work" class:active={workActive}>work</a>
			</nav>
		</div>
	</div>
</div>

<style>
	.bar {
		margin: 0 0 2rem 0;
	}
	.group {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 1.5rem 0;
	}
	nav {
		display: flex;
		grid-gap: 1rem;
		gap: 1rem;
	}
	a {
		font-family: var(--serif);
		font-size: 1.8rem;
		line-height: 1em;
		color: #000;
		text-decoration: none;
		transition: color 0.1s ease;
	}

	a.active {
		color: #c3c3c3;
		pointer-events: none;
	}
</style>
