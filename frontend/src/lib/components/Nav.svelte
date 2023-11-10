<script>
	import { page } from '$app/stores';
	import Headshot from './Headshot.svelte';
	let currentPath;

	$: currentPath = $page.url.pathname;
	$: homeActive = currentPath === '/';
	$: aboutActive = currentPath === '/about';
	$: resumeActive = currentPath === '/resume';
	$: workActive = currentPath === '/work';
	$: isInteriorPage = currentPath !== '/';
</script>

<div class="bar" class:int={isInteriorPage}>
	<div class="container">
		<div class="group">
			<div class="wrapper">
				<Headshot />
				<div class="txt">
					<div>
						<p class="name">Chris Lamberth</p>
						<p class="sub">Graphic Designer & Web Developer</p>
					</div>
				</div>
			</div>
			<nav>
				<a class="line" href="/" class:activeHome={homeActive}>home</a>
				<a class="line" href="/about" class:active={aboutActive}>about</a>
				<a class="line" href="/resume" class:active={resumeActive}>resume</a>
				<a class="line" href="/work" class:active={workActive}>work</a>
			</nav>
		</div>
	</div>
</div>

<style>
	.bar {
		transition: background 0.2s linear;
		overflow: hidden;
	}
	.bar.int {
		background-color: #000;
		margin: 0 0 3rem 0;
	}
	.group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 0;
		flex-direction: column-reverse;
	}
	.int .group {
		flex-direction: row;
	}

	.txt {
		flex: 1;
	}
	.int .txt {
		flex: unset;
		text-align: left;
	}
	.name {
		font-family: var(--serif);
		font-size: 3rem;
		line-height: 1em;
		margin: 0 0 0.2em 0;
	}
	.int .name {
		font-size: 1.2rem;
		letter-spacing: 1px;
	}
	.sub {
		font-family: var(--sans);
		line-height: 1em;
		font-size: 1.2rem;
	}
	.int .sub {
		font-size: 0.7rem;
	}
	.bar.int p {
		color: #fff;
	}
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 3rem;
		width: 100%;
		margin: 2rem 0 0 0;
	}
	.int .wrapper {
		width: unset;
		gap: 1rem;
		margin: unset;
	}
	nav {
		display: flex;
		grid-gap: 1rem;
		gap: 1rem;
		margin: 0 0 0 auto;
	}
	.bar.int a {
		color: #fff;
	}
	a {
		font-family: var(--serif);
		font-size: 1.6rem;
		line-height: 1em;
		color: #000;
		text-decoration: none;
		transform-origin: center center;
		transition: color 0.3s ease, scale 0.1s ease;
	}
	a:active {
		scale: 0.9;
	}

	a.active,
	.bar.int a.active {
		color: var(--color-accent);
		pointer-events: none;
	}
	a.activeHome {
		color: #c3c3c3;
		pointer-events: none;
	}
	@keyframes headshot {
		0% {
			translate: 0 5rem;
		}
		100% {
			translate: 0 0;
		}
	}
	@keyframes logotxt {
		0% {
			translate: -3rem 0;
			opacity: 0;
		}
		100% {
			translate: 0 0;
			opacity: 1;
		}
	}
</style>
