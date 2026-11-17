/** @type {import('svelte/action').Action<HTMLElement, { animation: { enter: gsap.TweenVars, exit: gsap.TweenVars }, trigger: boolean }>} */
export function animation(node, params) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	/** @type {typeof import('gsap').gsap | undefined} */
	let engine;
	let destroyed = false;
	let current = params;

	void import('gsap').then(({ gsap }) => {
		if (destroyed) return;
		engine = gsap;
		gsap.set(node, current.trigger ? current.animation.enter : current.animation.exit);
	});

	return {
		update(next) {
			current = next;
			engine?.to(node, next.trigger ? next.animation.enter : next.animation.exit);
		},
		destroy() {
			destroyed = true;
			engine?.killTweensOf(node);
		}
	};
}
