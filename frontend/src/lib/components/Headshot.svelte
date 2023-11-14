<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { animation } from '$lib/animation';
	let currentPath;
	let isInteriorPage;

	$: currentPath = $page.url.pathname;
	$: isInteriorPage = currentPath !== '/';

	let bgElement;

	onMount(() => {
		function handleMouseMove(event) {
			const { clientX, clientY, target } = event;
			const { innerWidth, innerHeight } = window;

			const xPercent = (clientX / innerWidth - 0.5) * -2;
			const yPercent = (clientY / innerHeight - 0.5) * -2;

			const maxTranslate = 30;

			const translateX = xPercent * maxTranslate;
			const translateY = yPercent * maxTranslate;

			bgElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
		}

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<a
	href="/"
	class="img"
	class:int={isInteriorPage}
	use:animation={{
		animation: {
			enter: {
				width: '3.2rem', // '30vw
				height: '2.8rem',
				x: 'auto',
				y: '0.4rem',
				duration: 0.22,
				delay: 0.05,
				ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
			},
			exit: {
				width: '30vw',
				height: '12rem',
				x: 'auto',
				y: '6rem',
				duration: 0.22,
				ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
			}
		},
		trigger: isInteriorPage
	}}
>
	<div bind:this={bgElement} class="bg" />
	<div
		class="headshot"
		use:animation={{
			animation: {
				enter: {
					x: '0',
					y: '0.7rem',
					scale: '1.1',
					duration: 0.22,
					delay: 0.05,
					ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
				},
				exit: {
					x: '0',
					y: '1.8rem',
					scale: '1',
					duration: 0.22,
					delay: 0.05,
					ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
				}
			},
			trigger: isInteriorPage
		}}
	/>
</a>

<style>
	.img {
		width: 30vw;
		max-width: 20rem;
		height: 12rem;
		transform: translate(0, 6rem);
		overflow: hidden;
		/* border-radius: 30rem; */
		mask-image: url('../images/mask.svg');
		-webkit-mask-image: url('../images/mask.svg');
		mask-size: contain;
		-webkit-mask-size: contain;
		mask-repeat: no-repeat;
		-webkit-mask-repeat: no-repeat;
		mask-position: center center;
		-webkit-mask-position: center center;
		position: absolute;
	}
	.img.int {
		width: 3.2rem;
		height: 2.8rem;
		transform: translate(0, 0.4rem);
	}
	.headshot {
		position: absolute;
		inset: 0;
		transform: translate(0, 1.8rem) scale(1);

		background: url('../images/headshot/chris.jpg') center center / contain no-repeat;
		mask: url('../images/headshot/mask.png') center center / contain no-repeat;
		-webkit-mask: url('../images/headshot/mask.png') center center / contain no-repeat;
	}
	.int .headshot {
		transform: translate(0, 0.7rem), scale(1.1);
	}
	.bg {
		position: absolute;
		inset: -2rem;
		translate: 0 0;
		background: url(../images/headshot/bg.jpg) center center / cover no-repeat;
	}
</style>
