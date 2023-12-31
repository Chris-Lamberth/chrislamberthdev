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

	const windowWidth = writable(typeof window !== 'undefined' ? window.innerWidth : 0);
	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => {
			windowWidth.set(window.innerWidth);
		});
	}

	onMount(() => {
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
					x: $windowWidth > 1000 ? '26rem' : $windowWidth <= 680 ? '0' : '40vw',
					y: $windowWidth <= 680 ? '16rem' : '9.5rem',
					duration: 0.22,
					delay: 0.05,
					ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
				}
			},
			trigger: isInteriorPage
		};
	}

	// Reactive state variable to track if the nav is open
	let navOpen = false;

	// Function to toggle nav open state
	function toggleNav() {
		navOpen = !navOpen;
	}

	$: {
		if (navOpen && $windowWidth > 680) {
			toggleNav();
		}
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
			<button class="nav_btn" class:close-state={navOpen} on:click={toggleNav}>
				<div />
				<div />
			</button>
			<nav class:mobile-state-open={navOpen}>
				<a class="line" href="/" on:click={toggleNav} class:activeHome={homeActive}>home</a>
				<a class="line" href="/about" on:click={toggleNav} class:active={aboutActive}>about</a>
				<a class="line" href="/resume" on:click={toggleNav} class:active={resumeActive}>resume</a>
				<a class="line" href="/work" on:click={toggleNav} class:active={workActive}>work</a>
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
		inset: -20px 0 auto 0;
		height: calc(100% + 20px);
		translate: 0 -100%;
		transition: translate 0.26s var(--easing-1);
		overflow: hidden;
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
		color: var(--txt-color);
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
		color: #fff;
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
		color: var(--txt-color);
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
		color: var(--txt-color);
		opacity: 0.15;
		pointer-events: none;
	}
	.nav_btn {
		position: absolute;
		inset: 0 calc(var(--site-pad) * -1) 0 auto;
		display: none;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.8em;
		padding: 1.3em var(--site-pad) 1.3em 1.3em;
		width: 6em;
		z-index: 51;
		transition: scale 0.26s var(--easing-1);
	}
	.nav_btn:active {
		scale: 0.8;
	}
	.nav_btn > div {
		background: var(--txt-color);
		border-radius: 2rem;
		width: 100%;
		height: 100%;
		transition: width 0.26s var(--easing-1), translate 0.26s var(--easing-1),
			rotate 0.26s var(--easing-1), background 0.1s linear;
	}

	.nav_btn > div:nth-child(2) {
		width: 85%;
	}
	.nav_btn.close-state > div:nth-child(1) {
		rotate: -45deg;
		translate: 0 150%;
	}
	.nav_btn.close-state > div:nth-child(2) {
		width: 100%;
		rotate: 45deg;
		translate: 0 -150%;
	}
	.int .nav_btn > div {
		background: #fff;
	}
	.nav_btn.close-state > div {
		background: #f0f0f0;
	}
	.mobile-state-open {
		translate: -100% 0;
	}
	.nav_btn:hover > div {
		background: var(--color-accent);
	}

	@media (min-width: 1000px) {
		.txt {
			transform: translate(26rem, 9.5rem);
		}
	}

	@media (max-width: 680px) {
		.txt {
			width: 100%;
			text-align: center;
			transform: translate(0, 16rem);
		}
		.int .txt {
			text-align: left;
		}
		.name {
			font-size: 8vw;
		}
		.sub {
			font-size: 3vw;
		}
		.nav_btn {
			display: flex;
		}
		nav {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			inset: 0 auto auto 120%;
			padding: calc(var(--bar-height) + var(--site-pad)) 4rem
				calc(var(--bar-height) + var(--site-pad)) 0;
			background: linear-gradient(170deg, #02242a 0%, #000 50%, #00221d 90%);
			z-index: 50;
			border-radius: var(--radius) 0 var(--radius) var(--radius);
			transition: translate 0.26s var(--easing-1);
			width: 100%;
		}
		a {
			font-size: 3rem;
			color: #fff;
		}
		a.activeHome {
			color: var(--color-accent);
		}
	}

	/* light mode */
	:global([data-theme='light']) .bar::before {
		background: linear-gradient(15deg, #02242a 0%, #000 50%, #00221d 90%);
	}

	/* dark mode */
	:global([data-theme='dark']) .bar::before {
		background: linear-gradient(90deg, #0b0b0b 0%, #000 100%);
		border-bottom: 0.5px solid #202020;
	}
</style>
