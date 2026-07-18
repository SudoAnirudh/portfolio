## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.
## 2024-05-31 - Fix Project Card Accessibility
**Learning:** Interactive cards must use semantic `<button>` elements without nested interactive elements to ensure native keyboard focus and correct screen reader behavior.
**Action:** Replace `div` onClick wrappers with semantic buttons, add `aria-label`, visible focus states, and replace inner buttons with `span` elements.
