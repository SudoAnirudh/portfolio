## 2024-05-22 - [Manual Focus Management]
**Learning:** The project mimics Tailwind classes in `index.css` but lacks full utility coverage (e.g., missing `animate-spin`). Inline styles in components often override potential CSS fixes, specifically `outline: none` on inputs which harms accessibility.
**Action:** Verify utility class existence in `index.css` before use. Remove inline accessibility-blocking styles and replace with semantic CSS classes that utilize the project's CSS variables (e.g., `var(--accent)`) for focus states.
