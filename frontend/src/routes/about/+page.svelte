<script>
	import { fade, fly } from 'svelte/transition';
</script>

<svelte:head>
	<meta
		name="description"
		content="Discover the creative world of Chris Lamberth, a Graphic Designer and Web Developer with a unique blend of artistic flair and technical expertise. Learn about his inspiring journey from Memphis to Jacksonville, and how his passion and experiences shape his innovative design and development projects."
	/>
</svelte:head>

<div class="container" in:fade={{ duration: 200, delay: 50 }} out:fade={{ duration: 50 }}>
	<article>
		<div class="group restaurant">
			<div class="img" in:fly={{ duration: 300, delay: 50, x: 30 }}>
				<img src="/images/restaurant.webp" alt="Chris at a restaurant" />
			</div>
			<div class="txt">
				<h2 in:fly={{ duration: 300, delay: 50, x: 30 }}>Hi there! I'm&nbsp;Chris.</h2>
				<p>
					Hailing from the vibrant streets of Memphis, TN, and now rooted in the eclectic vibes of
					Jacksonville, FL.🌴 My journey has taken me through the sunny shores of California, the
					historic landscapes of Virginia, and the peachy realms of Georgia. All that moving around
					took place early on so it's safe to say I grew up in Florida.
				</p>
			</div>
		</div>

		<p>
			As a kid, I found joy in illustration and painting, a passion that naturally led me to the
			world of computers and technology. This dual interest brought me to The Art Institute at
			Jacksonville, where I earned my BA in Graphic Design. Now, I'm part of the Dalton Agency
			family, where my days are filled with a mix of IT, graphic design, and primarily web
			development.
		</p>
		<div class="group working">
			<div class="img" in:fly={{ duration: 300, delay: 60, x: -30 }}>
				<img src="/images/working.webp" alt="Chris working at computer" />
			</div>
			<div class="txt">
				<p>
					But what really drives me? It's the joy of creation and the excitement of continuous
					learning. I've always been the one to quietly observe, soak in details, and then bring
					ideas to life with dedication and precision. Whether it's a complex web project or a
					simple design task, I approach it with the same level of enthusiasm and commitment.
				</p>
			</div>
		</div>
		<p>
			My career journey wasn't a straight shot to where I am today. It included various roles, from
			retail jobs as a teenager to commercial and residential painting while pursuing my studies. It
			was at Bluwave Productions where I discovered a deeper interest in web development. I created
			digital interactive ads using HTML, CSS and Flash. RIP🙏⚡ This interest blossomed at Dalton
			Agency, where I've had the opportunity to dive into diverse web projects, constantly expanding
			my skills and knowledge.
		</p>

		<div class="group painting">
			<div class="img">
				<img src="/images/painting.webp" alt="Chris painting" />
			</div>
			<div class="txt">
				<p>
					Away from the screen, I'm a builder at heart. My hobbies - woodworking, interior design,
					remodeling, 3D printing, and painting - are all about creating and bringing ideas to life.
					This builder's mindset extends beyond hobbies; it's a core part of who I am, both
					professionally and personally.
				</p>
				<p>
					I'm a man of few words, often the quiet one in the room, but always ready to lend a hand
					or offer a thoughtful solution. I value hard work, organization, and a keen attention to
					detail in all aspects of life.
				</p>
			</div>
		</div>

		<p>
			Joining me in my journey is my wonderful partner of over a decade and our two dogs, Mogley and
			Little, aka fArT sQuaD. We're the adventurous kind, always ready to pack our bags and explore
			new corners of the world, learning and experiencing as much as we can.
		</p>
		<div class="group fam">
			<div class="img">
				<img src="/images/mogley.gif" alt="Mogley spinning" loading="lazy" />
			</div>
			<div class="img">
				<img src="/images/chrisandbrittany.webp" alt="Chris & Brittany" />
			</div>
			<div class="img">
				<img src="/images/little.gif" alt="Little digging" loading="lazy" />
			</div>
		</div>
		<p>
			As I look ahead, my goal is to merge my technical skills with my creative vision in an
			environment that values innovation and forward-thinking. I'm excited about the possibilities
			that lie ahead in web development and design, and I'm eager to contribute to projects that are
			not only challenging but also make a meaningful impact.
		</p>

		<p>
			Welcome to my little corner of the internet - a space where creativity meets technology, and
			every project is a new adventure.
		</p>
	</article>
</div>

<style>
	:root {
		--gap: 1.6rem;
	}
	article {
		margin: 0 0 7rem 0;
	}
	h2 {
		color: var(--txt-color);
		font-family: var(--display);
		font-size: 1.6rem;
		margin: 0 0 0.8rem 0;
	}
	p {
		color: var(--txt-color);
		font-size: 1.2rem;
		margin: 0 0 var(--gap) 0;
	}

	.group {
		display: flex;
		gap: var(--gap);
		margin: 0 0 var(--gap) 0;
	}

	.img {
		border-radius: var(--radius);
		overflow: hidden;
		position: relative;
	}
	.img img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.group p {
		margin: unset;
	}
	.group .txt {
		flex: 6;
	}
	.restaurant {
		flex-direction: row-reverse;
	}
	.restaurant .img {
		flex: 3;
	}
	.working .img {
		flex: 6;
	}
	.working .img img {
		object-position: right center;
	}
	.painting {
		flex-direction: row-reverse;
	}
	.painting .img {
		flex: 4;
	}
	.fam {
		height: 20vw;
		max-height: 15rem;
	}
	.fam .img {
		flex: 1;
	}

	@media (width <= 600px) {
		.group {
			display: block;
		}
		.group .img {
			height: 40vw;
			width: 35%;
		}
		.restaurant .img {
			float: right;
			margin: 0 0 0.3rem 1rem;
		}
		.working .img {
			height: 23vw;
			width: 40%;
			float: left;
			margin: 0 1rem 0.3rem 0;
		}
		.painting .img {
			float: right;
			margin: 0 0 0.3rem 1rem;
			width: 45%;
		}
		.fam {
			display: flex;
			gap: 1rem;
			height: unset;
		}
		.fam .img {
			height: 30vw;
		}
		.fam > div:nth-child(odd) {
			flex: 2;
		}
	}
</style>
