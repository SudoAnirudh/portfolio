## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.

## 2026-07-22 - Interactive Divs and Nested Buttons
**Learning:** Converting interactive div cards to semantic buttons improves keyboard navigation, but requires changing any nested decorative buttons to spans to prevent invalid HTML and hydration errors.
**Action:** Always verify for nested interactive elements when converting card containers to semantic buttons.
