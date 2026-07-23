## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.
## 2026-07-23 - Semantic Buttons for Interactive Cards
**Learning:** Using `div` elements with `onClick` for interactive cards prevents native keyboard focus and screen reader interaction. Nesting `<button>` elements inside other interactive elements causes accessibility issues.
**Action:** Always use semantic `<button>` elements for clickable cards, provide appropriate `aria-label`s, handle `focus-visible` states, and ensure no interactive elements are nested inside them.
