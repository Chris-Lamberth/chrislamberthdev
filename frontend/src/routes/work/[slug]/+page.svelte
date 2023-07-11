<script>
	export let post;
</script>

<div class="group">
	<a href={`work/${post.slug.current}`}>
		 <div class="img" style="background-image: url({urlFor(post.mainImage.asset).width(600).format('webp', 'jpg').url()}); 
			  background-position: {post.mainImage.hotspot.x * 100}% {post.mainImage.hotspot.y * 100}%">
		 </div>
		 <div class="txt">
			  <h2>{post.slug.current}</h2>
			  <p>{post.description}</p>
		 </div>
	</a>
</div>