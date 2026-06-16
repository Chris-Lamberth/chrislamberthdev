import { gsap } from 'gsap';

const reducedMotion =
	typeof window !== 'undefined'
		? window.matchMedia('(prefers-reduced-motion: reduce)').matches
		: false;

export function animation(node, { animation, trigger }) {
	let isFirstRun = true;

	function runAnimation() {
		const target = trigger ? animation.enter : animation.exit;
		if (isFirstRun || reducedMotion) {
			gsap.set(node, target);
			isFirstRun = false;
		} else {
			gsap.to(node, target);
		}
	}

	runAnimation();

	return {
		update(newParams) {
			animation = newParams.animation;
			trigger = newParams.trigger;
			runAnimation();
		}
	};
}
