<script>

import { client, urlFor } from '$lib/sanity';

let dataPromise = client.fetch('*[_type == "post"] { _id, title, _createdAt, mainImage, slug, description }');

</script>

<div class="container">
	<div class="pad">
		{#await dataPromise}
				<p>Loading Feed</p>
			{:then data}
			<div class="group">
				{#each data as post}
				<a href={`work/${post.slug.current}`}>
					<div class="img" style="background-image: url({urlFor(post.mainImage.asset).width(600).format('webp', 'jpg').url()}); 
						background-position: {post.mainImage.hotspot.x * 100}% {post.mainImage.hotspot.y * 100}%">
					</div>
					<div class="txt">
						<h2>{post.title}</h2>
					</div>
				</a>
				{/each}
			</div>
			{:catch error}
			<p style="color: red">{error.message}</p>
		{/await} 
	</div>
</div>
<style>
	.pad{
		padding:4rem 0;
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