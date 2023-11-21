<script>
	import { page } from '$app/stores';
	import Headshot from './Headshot.svelte';
	import { animation } from '$lib/animation';
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	let currentPath;
	let isInteriorPage;

	$: currentPath = $page.url.pathname;
	$: homeActive = currentPath === '/';
	$: aboutActive = currentPath === '/about';
	$: resumeActive = currentPath === '/resume';
	$: workActive = currentPath === '/work';
	$: isInteriorPage = currentPath !== '/';

	const windowWidth = writable(0); // Initialize with a default value

	onMount(() => {
		// Set the initial width and update on resize
		windowWidth.set(window.innerWidth);

		function handleResize() {
			windowWidth.set(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	let animationConfig;

	$: {
		animationConfig = {
			animation: {
				enter: {
					x: '4rem',
					y: '0.8rem',
					duration: 0.22,
					ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
				},
				exit: {
					x: $windowWidth > 1000 ? '26rem' : '40vw',
					y: '9.5rem',
					duration: 0.22,
					delay: 0.05,
					ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
				}
			},
			trigger: isInteriorPage
		};
	}
</script>

<div class="bar" class:int={isInteriorPage}>
	<div class="container">
		<div class="group">
			<div class="wrapper">
				<div class="txt" use:animation={animationConfig}>
					<div>
						<p class="name">Chris Lamberth</p>
						<p class="sub">Graphic Designer & Web Developer</p>
					</div>
				</div>
				<Headshot />
			</div>
			<button class="nav_btn">
				<div />
				<div />
			</button>
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
		/* margin: 0 0 16rem 0; */
		height: var(--bar-height);
		transition: margin 0.26s 0.05s var(--easing-1);
		position: relative;
	}
	/* .bar.int {
		margin: 0 0 3rem 0;
	} */
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
		inset: 0 0 auto 0;
		transform: translate(40vw, 9.5rem);
		transition: color 0.26s linear;
		width: fit-content;
	}
	.int .txt {
		transform: translate(4rem, 0.8rem);
		color: #fff;
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
		margin: 0 0 0.05em 0;
	}
	.sub {
		font-family: var(--sans);
		line-height: 1em;
		font-size: 1.2rem;
	}
	.int .sub {
		font-size: 0.7rem;
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
	.nav_btn {
		display: flex;
		flex-direction: column;
		width: 3rem;
		height: 2rem;
	}
	.nav_btn > div {
		width: 100%;
		height: 0.5rem;
		background: #fff;
	}
	@keyframes headshot {
		0% {
			translate: 0 5rem;
		}
		100% {
			translate: 0 0;
		}
	}

	@media (min-width: 1000px) {
		.txt {
			transform: translate(26rem, 9.5rem);
		}
	}
	@media (max-width: 720px) {
		.name {
			font-size: 6vw;
		}
		.sub {
			font-size: 2.5vw;
		}
	}
	@media (max-width: 680px) {
		nav {
			display: none;
		}
		.nav_btn {
			display: block;
		}
	}
</style>
