<script>
</script>

<section class="banners">
	<div class="container">
		<div class="set">
			<div>
				<iframe
					data-size="728x90"
					src="http://www.daltonpreview.com/scad/35691/2/728x90"
					frameborder="0"
					title="Banner Ad 728x90"
				/>
			</div>
			<div>
				<iframe
					data-size="300x600"
					src="http://www.daltonpreview.com/scad/35691/2/300x600"
					frameborder="0"
					title="Banner Ad 300x600"
				/>
			</div>
			<div>
				<iframe
					data-size="160x600"
					src="http://www.daltonpreview.com/scad/35691/2/160x600"
					frameborder="0"
					title="Banner Ad 160x600"
				/>
			</div>
			<div>
				<iframe
					data-size="300x250"
					src="http://www.daltonpreview.com/scad/35691/2/300x250"
					frameborder="0"
					title="Banner Ad 300x250"
				/>

				<iframe
					data-size="300x50"
					src="http://www.daltonpreview.com/scad/35691/2/300x50"
					frameborder="0"
					title="Banner Ad 300x50"
				/>
			</div>
		</div>
	</div>
</section>

<style>
	.banners .set {
		background: var(--gray-100);
		border-radius: var(--radius);
		padding: 4rem 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}
	.banners .set > div {
		display: flex;
		gap: 1rem;
		flex-direction: column;
	}
	iframe {
		width: 100%;
		height: auto;
	}
	[data-size='728x90'] {
		max-width: 728px;
		max-height: 90px;
		aspect-ratio: 728 / 90;
	}
	[data-size='300x600'] {
		max-width: 300px;
		max-height: 600px;
		aspect-ratio: 300 / 600;
	}
	[data-size='160x600'] {
		max-width: 160px;
		max-height: 600px;
		aspect-ratio: 160 / 600;
	}
	[data-size='300x250'] {
		max-width: 300px;
		max-height: 250px;
		aspect-ratio: 300 / 250;
	}
	[data-size='300x50'] {
		max-width: 300px;
		max-height: 50px;
		aspect-ratio: 300 / 50;
	}
	@media (width <= 840px) {
		[data-size='728x90'] {
			display: none;
		}
		.banners .set div:has([data-size='728x90']) {
			display: none;
		}
	}
</style>
