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
				<div class="txt">
					<div>
						<p class="name">Chris Lamberth</p>
						<p class="sub">Graphic Designer & Web Developer</p>
					</div>
				</div>
				<Headshot />
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
		--bar-height: 3.5rem;
		transition: background 0.26s linear;
		margin: 0 0 16rem 0;
		height: var(--bar-height);
		transition: margin 0.26s 0.05s var(--easing-1);
		position: relative;
	}
	.bar.int {
		margin: 0 0 3rem 0;
	}
	.bar::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 100%;
		background: #000;
		translate: 0 -100%;
		transition: translate 0.26s var(--easing-1);
	}
	.bar.int::before {
		translate: 0 0;
	}
	@keyframes bar-bg {
		0% {
			translate: 0 -100%;
		}
		100% {
			translate: 0 0;
		}
	}
	.group {
		position: relative;
	}

	.txt {
		position: absolute;
		inset: 9.5rem auto auto 36vw;
		transition: inset 0.26s var(--easing-1);
	}
	.int .txt {
		flex: unset;
		text-align: left;
		inset: 0.8rem auto auto 4rem;
	}
	.name {
		font-family: var(--serif);
		font-size: 3rem;
		line-height: 1em;
		margin: 0 0 0.2em 0;
		transition: font-size 0.26s var(--easing-1), letter-spacing 0.26s var(--easing-1),
			color 0.3s linear, margin 0.26s var(--easing-1);
	}
	.int .name {
		font-size: 1.2rem;
		letter-spacing: 1px;
		margin: 0 0 0.05em 0;
	}
	.sub {
		font-family: var(--sans);
		line-height: 1em;
		font-size: 1.2rem;
		transition: font-size 0.26s var(--easing-1), letter-spacing 0.26s var(--easing-1),
			color 0.26s linear, margin 0.26s var(--easing-1);
	}
	.int .sub {
		font-size: 0.7rem;
	}
	.bar.int p {
		color: #fff;
	}
	.wrapper {
		height: var(--bar-height);
	}
	nav {
		display: flex;
		grid-gap: 1rem;
		gap: 1rem;
		margin: 0 0 0 auto;
		position: absolute;
		inset: 1rem 0 auto auto;
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
		transition: color 0.26s var(--easing-1), scale 0.26s var(--easing-1);
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
	@media (min-width: 1233px) {
		.txt {
			inset: 9.5rem auto auto 26rem;
		}
	}
</style>
