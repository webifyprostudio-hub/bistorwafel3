@import "tailwindcss";

@theme {
  --font-sans: "Helvetica Neue", Arial, sans-serif;
  --font-serif: "Georgia", serif;

  --color-bistro-dark: #0A0A0A;
  --color-bistro-charcoal: #161616;
  --color-bistro-gold: #C9A84C;
  --color-bistro-gold-hover: #D8B75B;
  --color-bistro-light: #F5F5F0;
}

body {
  background-color: var(--color-bistro-dark);
  color: var(--color-bistro-light);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scroll-mask {
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-bistro-dark);
}
::-webkit-scrollbar-thumb {
  background: var(--color-bistro-charcoal);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #333;
}
