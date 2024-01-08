<script>
	let currentYear = new Date().getFullYear();
	import { fade, fly } from 'svelte/transition';
</script>

<div class="container" in:fade={{ duration: 200 }} out:fade={{ duration: 50 }}>
	<div class="resume">
		<div class="header">
			<div class="group">
				<div>
					<h1 in:fly={{ duration: 300, delay: 50, x: 30 }}>Chris Lamberth</h1>
					<p in:fly={{ duration: 300, delay: 100, x: 30 }}>web developer & graphic designer</p>
				</div>
				<div>
					<button class="btn download">
						Download PDF
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-file-down"
						>
							<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
							<polyline points="14 2 14 8 20 8" />
							<path d="M12 18v-6" />
							<path d="m9 15 3 3 3-3" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<div class="details">
			<div>
				<section>
					<h2 class="hl_sm">Experience</h2>
					<div class="item">
						<h3>2019 - {currentYear}</h3>
						<h4>Dalton Agency</h4>
						<p class="sub">Web Developer</p>
					</div>
					<div class="item">
						<h3>2018 - 2019</h3>
						<h4>Bluwave Productions</h4>
						<p class="sub">Operations Coordinator, Graphic Designer</p>
					</div>
					<div class="item">
						<h3>2016 - 2018</h3>
						<h4>Bluwave Productions</h4>
						<p class="sub">Digital Production Coorinator</p>
					</div>
					<div class="item">
						<h3>2013 - 2016</h3>
						<h4>Bluwave Productions</h4>
						<p class="sub">Assistant Digital Production Manager</p>
					</div>
					<div class="item">
						<h3>2012 - 2013</h3>
						<h4>Bluwave Productions</h4>
						<p class="sub">Web Producer</p>
					</div>
				</section>
				<section>
					<h2 class="hl_sm">Education</h2>
					<div class="item">
						<h3>2008 - 2011</h3>
						<h4>Art Institute of Jacksonville</h4>
						<p class="sub">BA, Graphic Design</p>
					</div>
				</section>
			</div>
			<div>
				<section>
					<h2 class="hl_sm">Career Objective</h2>
					<p>
						Dynamic and creative professional with a comprehensive background in Web Development and
						Graphic Design, seeking to apply my skills in a challenging and innovative environment.
						With a rich history of Web Development, complemented by a strong foundation in Graphic
						Design from the Art Institute of Jacksonville, I'm equipped to contribute effectively on
						digital media projects. My goal is to work with forward-thinking organizations and small
						businesses where I can blend my technical skills and creative vision to produce
						outstanding digital content and web apps. I'm passionate about creating engaging digital
						experiences and committed to staying abreast of the latest industry trends to deliver
						high-quality solutions.
					</p>
				</section>
				<section>
					<h2 class="hl_sm">Design Skills</h2>
					<p><strong>Figma, Photoshop, Illustrator, InDesign, Premiere, After Effects</strong></p>
				</section>
				<section>
					<h2 class="hl_sm">Web Skills</h2>
					<p><strong>HTML, CSS, Javascript, PHP, Wordpress, Node, SvelteKit</strong></p>
				</section>
			</div>
		</div>
		<button class="btn download btm">
			Download PDF
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-file-down"
			>
				<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
				<polyline points="14 2 14 8 20 8" />
				<path d="M12 18v-6" />
				<path d="m9 15 3 3 3-3" />
			</svg>
		</button>
	</div>
</div>

<style>
	.resume {
		margin: 0 0 3rem 0;
		color: var(--txt-color);
	}
	.header {
		margin: 0 0 3rem 0;
	}
	.header .group {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	h1 {
		font-family: var(--serif);
		font-size: 2.4rem;
		margin: 0 0 0.1em 0;
	}
	h2 {
		margin: 0 0 1em 0;
	}
	p {
		font-size: 1.1rem;
	}
	.header p {
		font-size: 1.4rem;
	}
	.download {
		font-family: var(--sans);
		font-size: 0.7rem;
		position: relative;
		transition: scale 0.1s ease, background 0.1s ease, border 0.1s ease;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin: 0 0 0 auto;
		z-index: 10;
		color: var(--txt-color);
		border: 1px solid var(--txt-color);
		letter-spacing: unset;
		line-height: 1;
		outline: none;
	}
	.download.btm {
		margin: 3rem 0 0 0;
		padding: 1.4rem;
		display: none;
		width: 100%;
		justify-content: center;
		font-size: 1rem;
	}
	.download svg {
		width: 1rem;
		height: 1rem;
		stroke: #000;
		transition: stroke 0.15s linear;
		stroke: var(--txt-color);
	}
	.download:hover,
	.download:focus-visible {
		background: var(--color-accent);
		border: 1px solid var(--color-accent);
		color: #000;
	}
	.download:hover svg,
	.download:focus-visible svg {
		stroke: #000;
	}
	.download:active {
		scale: 0.9;
	}
	.details {
		display: flex;
		gap: 1rem;
	}
	.details > div {
		flex: 1;
	}
	.item:not(:last-child) {
		margin: 0 0 1.2rem 0;
	}
	h3 {
		font-family: var(--serif);
		font-size: 0.8rem;
		letter-spacing: 0.05em;
	}
	h4 {
		font-size: 1.2rem;
		font-weight: 600;
	}

	.details section:not(:last-child) {
		margin: 0 0 2.2rem 0;
	}
	.details p strong {
		font-weight: 500;
	}
	@media (max-width: 600px) {
		.download {
			display: none;
		}
		.download.btm {
			display: flex;
		}
	}
	@media (max-width: 700px) {
		.details {
			flex-direction: column-reverse;
			gap: 2.2rem;
		}
	}
</style>
