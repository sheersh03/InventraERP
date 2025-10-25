'use client';

export function initTheme() {
  try {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const hour = new Date().getHours();
    const theme =
      prefersDark ? "dark" :
      hour >= 22 || hour < 6 ? "dark" :
      hour >= 18 ? "dim" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch {}
}
