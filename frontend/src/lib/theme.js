// src/lib/theme.js
import { writable } from 'svelte/store';

// Initialize the theme store
export const theme = writable('light'); // default to 'light'

// Function to update the theme
export function updateTheme(newTheme) {
  theme.set(newTheme);
  // Update the theme attribute on the HTML element
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', newTheme);
    // Update the cookie
    document.cookie = `theme=${newTheme};path=/;max-age=31536000`; // 1 year expiration
  }
}

// Initialize theme based on user preference or system setting
export function initializeTheme() {
  if (typeof document !== 'undefined') {
    const savedTheme = getCookie('theme') || getSystemPreference() || 'light';
    updateTheme(savedTheme);
  }
}

// Helper function to get a cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Helper function to get system theme preference
function getSystemPreference() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
