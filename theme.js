const root = document.documentElement;
const preferredDark = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme;

try {
  savedTheme = localStorage.getItem('portfolio-theme');
} catch {
  // The system preference still works when storage is unavailable.
}

function updateTheme(button) {
  const dark = savedTheme === 'dark' || (savedTheme !== 'light' && preferredDark.matches);
  root.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#151d17' : '#f8f6ee';
  button?.setAttribute('aria-pressed', String(dark));
}

updateTheme();
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.theme-toggle');
  updateTheme(button);
  button.hidden = false;
  button.addEventListener('click', () => {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    updateTheme(button);
    try {
      localStorage.setItem('portfolio-theme', savedTheme);
    } catch {
      // The selection applies for the current page.
    }
  });
  preferredDark.addEventListener('change', () => updateTheme(button));
});
