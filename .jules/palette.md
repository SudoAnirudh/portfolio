## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.

## 2024-07-19 - Semantic Buttons for Interactive Cards
**Learning:** Using generic `<div>` elements with `onClick` for interactive cards breaks native keyboard accessibility and screen reader support. Furthermore, nesting interactive elements (like a `<button>` inside a card `<button>`) creates invalid HTML and accessibility issues.
**Action:** Always use semantic `<button>` elements for clickable cards, provide visible focus fallbacks (e.g., `focus-visible:ring`), and change nested interactive elements into decorative spans.
