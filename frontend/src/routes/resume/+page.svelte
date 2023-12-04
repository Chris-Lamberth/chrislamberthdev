<script>
	let currentYear = new Date().getFullYear();
</script>

<div class="container">
	<div class="resume">
		<div class="header">
			<div class="group">
				<div>
					<h1>Chris Lamberth</h1>
					<p>web developer & graphic designer</p>
				</div>
				<div>
					<button class="download">
						<span>Download PDF</span>
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
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis maiores ad asperiores
						consequuntur odit repudiandae minus quisquam? Atque harum animi eos maxime, fugiat fuga
						aut, maiores esse aspernatur ipsum officia? Aperiam porro eos, possimus odio corrupti
						harum id nam blanditiis est voluptatibus voluptatum assumenda nostrum quam consequatur
						tenetur voluptatem illo minus tempora atque iste voluptates dolorum earum hic. Omnis,
						adipisci! Culpa beatae sed fuga labore temporibus! Quis sequi aspernatur delectus earum,
						optio explicabo, cupiditate.
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
	</div>
</div>

<style>
	.resume {
		padding: 3rem;
		border: 1px rgb(238, 238, 238) solid;
		border-radius: var(--radius);
		margin: 0 0 3rem 0;
		background: rgba(255, 255, 255, 0.6);
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
	.header p {
		font-size: 1.4rem;
	}
	.download {
		position: relative;
		transition: scale 0.1s ease;
		display: flex;
		align-items: stretch;
		margin: 0 0 0 auto;
		z-index: 10;
	}
	.download svg {
		width: 1.6rem;
		height: 1.6rem;
		stroke: #000;
	}
	.download span {
		position: absolute;
		inset: 0 0 0 auto;
		padding: 0 3em 0 1.2em;
		background: var(--color-accent);
		z-index: -1;
		white-space: nowrap;
		border-radius: 5rem;
		display: flex;
		align-items: center;
		margin: -0.4rem -0.4rem -0.4rem 0;
		opacity: 0;
		transition: opacity 0.15s ease;
	}
	.download:hover span {
		opacity: 1;
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
	/* write a media query */
	@media (max-width: 700px) {
		.resume {
			padding: 2rem;
		}
		.details {
			flex-direction: column-reverse;
			gap: 2.2rem;
		}
	}
</style>
