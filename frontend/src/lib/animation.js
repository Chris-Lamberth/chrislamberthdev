import { gsap } from 'gsap';

export function animation(node, { animation, trigger }) {
    let isFirstRun = true;

    function runAnimation() {
        if (isFirstRun) {
            // Directly set the initial position without animation
            gsap.set(node, trigger ? animation.enter : animation.exit);
            isFirstRun = false;
        } else {
            // Run the animation
            gsap.to(node, trigger ? animation.enter : animation.exit);
        }
    }

    runAnimation();

    return {
        update(newParams) {
            // Update the parameters and run the animation
            animation = newParams.animation;
            trigger = newParams.trigger;
            runAnimation();
        }
    };
}
