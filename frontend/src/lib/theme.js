import { writable } from 'svelte/store';

/** @typedef {'light' | 'dark'} Theme */

export const theme = writable(/** @type {Theme} */ ('light'));

/** @param {Theme} newTheme */
export function updateTheme(newTheme) {
	theme.set(newTheme);
	document.documentElement.dataset.theme = newTheme;
	document.cookie = `theme=${newTheme};path=/;max-age=31536000;SameSite=Lax`;
}

export function initializeTheme() {
	if (typeof document !== 'undefined') {
		theme.set(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
	}
}
