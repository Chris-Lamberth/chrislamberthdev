<script>
	export let work;
 </script>
 
 <!-- Then use `work` variable in your component -->
 {#if Array.isArray(work)}
	{#each work as post}
	  <h1>{post.title}</h1>
	  <!-- other properties here -->
	{/each}
 {:else}
	<p>No posts to display.</p>
 {/if}
 