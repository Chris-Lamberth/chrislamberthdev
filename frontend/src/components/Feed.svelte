<script>

	import { client, urlFor } from '../sanity';

let dataPromise = client.fetch('*[_type == "post"] { _id, title, _createdAt, mainImage, slug, description }');
function imageUrlWithHotspot(image) {
  let ref = image.asset._ref;
  let hotspot = image.hotspot;
  let url = urlFor(image.asset);

  if (hotspot) {
    url = url.focalPoint(hotspot.x * 100, hotspot.y * 100);
  }

  return url.url();
}

</script>

<div class="container">
	{#await dataPromise}
  <p>...waiting</p>
{:then data}
<div class="pad">
	<div class="group">
		{#each data as post}
		  <div>
			 <div class="img" style="background-image: url({urlFor(post.mainImage.asset).url()}); 
				background-position: {post.mainImage.hotspot.x * 100}% {post.mainImage.hotspot.y * 100}%">
			 </div>
			 <div class="txt">
				<h2>{post.title}</h2>
			 </div>
		  </div>
		{/each}
	</div>
</div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await} 
</div>

<style>
	.pad{
		padding:2rem 0;
	}
	.group{
		display:grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 2rem;
	}
	.img{
		height:15vw;
		max-height:200px;
		overflow:hidden;
		border-radius:2rem;
		background-size: cover;
  		background-repeat: no-repeat;
		background-position: center center;
	}
	.txt{
		padding:.5rem 0 0 1rem;
	}
</style>