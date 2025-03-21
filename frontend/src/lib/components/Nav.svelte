<script>
	import { page } from '$app/stores';
	import Headshot from './Headshot.svelte';
	import { animation } from '$lib/animation';
	import { writable } from 'svelte/store';
	import { theme, updateTheme } from '$lib/theme.js';

	let currentPath = $derived($page.url.pathname);
	let isInteriorPage = $derived(currentPath !== '/');

	let activeStates = $derived({
		home: currentPath === '/',
		about: currentPath === '/about',
		resume: currentPath === '/resume',
		work: currentPath === '/work'
	});

	const windowWidth = writable(typeof window !== 'undefined' ? window.innerWidth : 0);

	$effect.root(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				windowWidth.set(window.innerWidth);
			};

			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	let exitX = $derived($windowWidth > 1000 ? '26rem' : $windowWidth <= 720 ? '0' : '40vw');
	let exitY = $derived($windowWidth <= 720 ? '16rem' : '9.5rem');

	let animationConfig = $derived({
		animation: {
			enter: {
				x: '4rem',
				y: '0.8rem',
				duration: 0.22,
				ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
			},
			exit: {
				x: exitX,
				y: exitY,
				duration: 0.22,
				delay: 0.05,
				ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
			}
		},
		trigger: isInteriorPage
	});

	// Reactive state variable to track if the nav is open
	let navOpen = $state(false);

	// Function to toggle nav open state
	function toggleNav() {
		navOpen = !navOpen;
	}

	$effect(() => {
		if (navOpen && $windowWidth > 720) {
			toggleNav();
		}
	});

	let nextTheme = $derived($theme === 'light' ? 'dark' : 'light');

	// Function to toggle the theme
	function toggleTheme() {
		updateTheme(nextTheme);
	}

	// Swipe gesture for mobile
	function swipe(node) {
		let startX = $state(0),
			startY = $state(0),
			movedX = $state(0),
			movedY = $state(0);

		function handleTouchStart(event) {
			startX = event.touches[0].clientX;
			startY = event.touches[0].clientY;
			movedX = movedY = 0;

			node.addEventListener('touchmove', handleTouchMove);
			node.addEventListener('touchend', handleTouchEnd);
		}

		function handleTouchMove(event) {
			movedX = event.touches[0].clientX - startX;
			movedY = event.touches[0].clientY - startY;
		}

		function handleTouchEnd(event) {
			node.removeEventListener('touchmove', handleTouchMove);
			node.removeEventListener('touchend', handleTouchEnd);

			// Determine if the touch was a swipe to the right
			if (navOpen && movedX > 50 && Math.abs(movedY) < 50) {
				// Swipe to the right detected
				navOpen = false;
			}
		}

		node.addEventListener('touchstart', handleTouchStart);

		return {
			destroy() {
				node.removeEventListener('touchstart', handleTouchStart);
				node.removeEventListener('touchmove', handleTouchMove);
				node.removeEventListener('touchend', handleTouchEnd);
			}
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
			<button aria-label="Nav" class="nav_btn" class:close-state={navOpen} on:click={toggleNav}>
				<div></div>
				<div></div>
			</button>
			<nav use:swipe class:mobile-state-open={navOpen}>
				<a class="line" href="/" on:click={toggleNav} class:activeHome={activeStates.home}>home</a>
				<a class="line" href="/about" on:click={toggleNav} class:active={activeStates.about}
					>about</a
				>
				<a class="line" href="/resume" on:click={toggleNav} class:active={activeStates.resume}
					>resume</a
				>
				<a class="line" href="/work" on:click={toggleNav} class:active={activeStates.work}>work</a>
				<button title="toggle light/dark mode" class="theme-toggle" on:click={toggleTheme}>
					{#if $theme === 'light'}
						<img src="/images/light.svg" alt="light mode" />
					{:else}
						<img src="/images/dark.svg" alt="dark mode" />
					{/if}
				</button>
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
		transition:
			translate 0.26s var(--easing-1),
			filter 0.26s ease;
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
		font-family: var(--display);
		font-size: 3rem;
		line-height: 1em;
		margin: 0 0 0.2em 0;
	}
	.int .name {
		color: #fff;
		font-size: 1.1rem;
		letter-spacing: 1px;
		margin: 0 0 0.05em 0;
	}
	.sub {
		font-family: var(--body);
		line-height: 1em;
		font-size: 1.2rem;
	}
	.int .sub {
		font-size: 0.7rem;
	}
	.wrapper {
		height: var(--bar-height);
		transition: filter 0.26s ease;
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
		font-family: var(--display);
		font-size: 1.4rem;
		line-height: 1em;
		color: var(--txt-color);
		text-decoration: none;
		transform-origin: center center;
		transition:
			color 0.26s var(--easing-1),
			scale 0.26s var(--easing-1);
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
		width: 5rem;
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
		transition:
			width 0.26s var(--easing-1),
			translate 0.26s var(--easing-1),
			rotate 0.26s var(--easing-1),
			background 0.1s linear;
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

	.theme-toggle {
		width: 25px;
		height: 25px;
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		outline: none;
		transition: scale 0.2s ease;
	}
	.theme-toggle:active {
		scale: 0.8;
	}
	.theme-toggle img {
		width: 70%;
		height: 70%;
		opacity: 0.4;
		transition:
			filter 0.2s ease,
			opacity 0.2s ease;
	}
	.theme-toggle::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--txt-color);
		z-index: -1;
		border-radius: 20rem;
		scale: 0;
		transition: scale 0.2s ease;
	}
	.theme-toggle:hover img,
	.theme-toggle:focus-visible img {
		filter: invert();
		opacity: 1;
	}
	.theme-toggle:hover::before,
	.theme-toggle:focus-visible::before {
		scale: 1;
	}

	/* light mode */
	:global([data-theme='light']) .bar::before {
		background: linear-gradient(15deg, #02242a 0%, #000 50%, #00221d 90%);
	}
	:global([data-theme='light']) .int .theme-toggle img {
		filter: invert();
	}
	:global([data-theme='light']) .int .theme-toggle:hover img,
	:global([data-theme='light']) .int .theme-toggle:focus-visible img {
		filter: none;
	}
	:global([data-theme='light']) .int .theme-toggle::before {
		background: var(--bg-color);
	}

	/* dark mode */
	:global([data-theme='dark']) .bar::before {
		background: linear-gradient(90deg, #0b0b0b 0%, #000 100%);
		border-bottom: 0.5px solid #202020;
	}
	:global([data-theme='dark']) .theme-toggle img {
		width: 60%;
		height: 60%;
	}

	:global([data-theme='dark']) .bar.int a {
		color: var(--txt-color);
	}
	:global([data-theme='dark']) a.active,
	.bar.int a.active {
		color: var(--color-accent);
	}

	@media (min-width: 1000px) {
		.txt {
			transform: translate(26rem, 9.5rem);
		}
	}

	@media (max-width: 720px) {
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
			align-items: flex-start;
			inset: 0 -32rem auto auto;
			padding: var(--bar-height) 0 var(--bar-height) 4rem;
			background: linear-gradient(170deg, #02242a 0%, #000 50%, #00221d 90%);
			z-index: 50;
			border-radius: 0 0 var(--radius) var(--radius);
			transition: translate 0.26s var(--easing-1);
			width: 100%;
			max-width: 25rem;
		}
		:global([data-theme='dark']) nav {
			background: #000;
			outline: 1px solid var(--color-accent);
		}
		a {
			font-size: 3rem;
			color: #fff;
		}
		a.activeHome {
			color: var(--color-accent);
			opacity: 1;
		}
		.theme-toggle {
			width: 50px;
			height: 50px;
			margin-top: 2rem;
		}
		.theme-toggle img {
			opacity: 1;
		}
		:global([data-theme='light']) .theme-toggle img,
		:global([data-theme='light']) .int .theme-toggle img {
			filter: invert();
		}
	}
	/* @media (max-width: 460px) {
		nav {
			inset: 0 auto auto calc(100% + 5rem);
			padding: var(--bar-height) 0 var(--bar-height) 0;
			align-items: center;
			width: calc(100% + 10rem);
			max-width: unset;
		}
	} */
</style>
