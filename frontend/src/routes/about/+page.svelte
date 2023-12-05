<script>
	import { fade } from 'svelte/transition';
</script>

<div class="container" in:fade={{ duration: 100, delay: 50 }} out:fade={{ duration: 50 }}>
	<h1>About</h1>
</div>
