## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.
## 2024-05-18 - Project Card Accessibility
**Learning:** Using `div` with `onClick` for interactive cards prevents native keyboard focus and is inaccessible to screen readers.
**Action:** Use semantic `button` elements for clickable cards, provide descriptive `aria-label`s, avoid nesting buttons inside buttons, and ensure visible focus states (`focus-visible`).
