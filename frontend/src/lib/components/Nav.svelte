<script>
	import { page } from '$app/stores';
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
			<div class="logo">
				<a href="/" class="img">
					<img src="../images/chris-lamberth.jpg" alt="Chris Lamberth" />
				</a>
				<div>
					<p>Chris Lamberth</p>
					<p><span>web developer & graphic designer</span></p>
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
		margin: 0 0 3rem 0;
		transition: background 0.2s linear;
		overflow: hidden;
	}
	.bar.int {
		background-color: #000;
	}
	.bar .logo {
		display: none;
	}
	.bar.int .logo {
		display: flex;
		align-items: center;
		gap: 1rem;
		color: #fff;
		margin: -1rem 0;
	}
	.bar .logo p {
		font-family: var(--serif);
		font-size: 1rem;
		line-height: 1em;
		letter-spacing: 0.05em;
		opacity: 0;
		animation: logotxt 0.3s ease forwards;
	}
	.bar .logo p span {
		font-size: 0.8rem;
		color: #c3c3c3;
		letter-spacing: 0;
	}
	.logo .img {
		overflow: hidden;
		width: 3rem;
		height: 3rem;
		aspect-ratio: 1;
		border-radius: 50%;
		align-self: flex-start;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		animation: headshot 0.3s ease forwards;
		position: relative;
	}
	.logo .img::before {
		content: '';
		position: absolute;
		background: url('../images/chris-lamberth-hoodie-sm.jpg') top center / 150% no-repeat;
		inset: 0;
		display: none;
	}
	.logo .img:hover::before {
		display: block;
	}
	.logo .img img {
		object-fit: cover;
		width: 150%;
	}
	.group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 0;
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
