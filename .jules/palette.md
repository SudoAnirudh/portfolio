## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.
## 2026-07-24 - Accessible Clickable Project Cards
**Learning:** Using `<div onClick={...}>` for interactive cards breaks keyboard navigation and screen reader support, and nesting `<button>` inside `<button>` is invalid HTML.
**Action:** Use a single semantic `<button>` for the entire card with a visible focus ring, and convert any inner pseudo-buttons to styled `<span>` elements.
