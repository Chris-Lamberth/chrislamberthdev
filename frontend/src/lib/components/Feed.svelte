<script>
import { imgUrl } from '$lib/sanity';
import { getPosts } from "$lib/sanity";


</script>
{#await getPosts()}
<p>Loading Feed</p>
{:then data}
<div class="group">
  {#each data as post}
	 <a href={`work/${post.slug.current}`}>
		<div class="img" style="background-image: url({imgUrl(post.mainImage.asset).width(600).format('webp', 'jpg').url()}); 
			 background-position: {post.mainImage.hotspot.x * 100}% {post.mainImage.hotspot.y * 100}%">
		</div>
		<div class="txt">
		  <h3>{post.title}</h3>
			{#if post.categories}
				<p class="categories">
					{#each post.categories as category, index}
						<span>{category.title}</span>
					{/each}
				</p>
			{/if}
		</div>
	 </a>
  {/each}
</div>
{:catch error}
<p style="color: red">{error.message}</p>
{/await}

<style>
	
	.group{
		display:grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 2rem;
	}
	.img{
		height:15vw;
		max-height:200px;
		overflow:hidden;
		border-radius:var(--radius);
		background-size: cover;
  		background-repeat: no-repeat;
		background-position: center center;
	}
	.txt{
		padding:.5rem 0 0 1rem;
	}
	a{
		text-decoration:none;
		color:#000;
	}
	h3{
		font-size:1rem;
		font-weight: 600;
		letter-spacing: .02em;
		margin:.5em 0 .3em 0;
	}
	.categories{
		line-height:.8em;
	}
	.categories span{
		font-size: .7rem;
		color:#9f9f9f;
		display:inline-block;
		margin:0 .8em 0 0;
	}
</style>