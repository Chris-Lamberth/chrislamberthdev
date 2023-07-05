<script context="module">
	export { load } from './+page.js';
 </script>
 
 <script>
	export let post;
 </script>
 
 <h1>{post.title}</h1>
 <svelte:head>
	<title>{post.title}</title>
 </svelte:head>
 
 <article>
	{@html post.body}
 </article>
 