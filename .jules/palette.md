## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.

## 2026-07-26 - Semantic Clickable Cards
**Learning:** Using `<div onClick>` for interactive cards breaks native keyboard navigation (tab order) and screen reader support. Additionally, nesting buttons (like a 'Load Cartridge' button inside a clickable card) creates invalid HTML.
**Action:** Always use semantic `<button>` tags for interactive components, apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` for focus states, and avoid nesting interactive elements.
