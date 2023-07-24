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
		gap:1.5rem;
		grid-template-columns: 1fr 1fr;
	}
	a{
		outline:none;
	}
	.group .img{
		aspect-ratio: 1;
		background-size: 100%;
  		background-repeat: no-repeat;
		background-position: center center;
		border-radius: var(--radius);
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 1), 0 0 0 0px #000;
		transition:background-size 5s ease-out, box-shadow .1s ease-in-out;
	}
	a:hover .img{
		background-size:110%;
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px #000;
	}
	a:focus .img{
		outline: none;
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px #000;
		
	}
	@media (width <= 600px) {
		.group{
			grid-template-columns: 1fr 1fr 1fr 1fr;
			gap:1rem;
		}
	}

 </style>

