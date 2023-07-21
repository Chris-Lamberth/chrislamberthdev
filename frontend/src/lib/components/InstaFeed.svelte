<script>
	import { getInstaPosts } from '$lib/sanity';
 </script>
 
 {#await getInstaPosts()}
	<p>Loading Feed</p>
 {:then data}
	<div class="group">
	  {#each data as post}
		 <a href={post.postURLs} target="_blank">
			<div class="img" style="background-image: url({post.imageUrl})"></div>
		 </a>
	  {/each}
	</div>
 {:catch error}
	<p style="color: red">{error.message}</p>
 {/await}
 

 <style>
	.group{
		display:grid;
		gap:2rem;
		grid-template-columns: 1fr 1fr;
	}
	.group .img{
		aspect-ratio: 1;
		background-size: cover;
  		background-repeat: no-repeat;
		background-position: center center;
		border-radius: var(--radius);
	}
 </style>