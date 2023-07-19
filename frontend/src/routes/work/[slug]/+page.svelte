<script>
	export let data;
	import { imgUrl } from '$lib/sanity';
</script>

<section class="post">
	<div class="hero" style="background-image:url('{imgUrl(data.mainImage.asset).format('webp', 'jpg').url()}'); background-position: {data.mainImage.hotspot.x * 100}% {data.mainImage.hotspot.y * 100}%"></div>
	<div class="container">
		<h1>{data.title}</h1>
	</div>
</section>

<style>
	.hero{
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		height:50vh;
		width:100vw;
	}
	 
</style>