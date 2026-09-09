## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.

## 2024-05-18 - [Add ARIA label to ProjectModal close button]
**Learning:** Found an icon-only button inside the ProjectModal that lacked an `aria-label`, making it difficult for screen reader users to understand its function. Also, the icon font text should be explicitly hidden with `aria-hidden="true"`.
**Action:** When using icon-only buttons, always explicitly add an `aria-label` to the parent `<button>` and apply `aria-hidden="true"` to the inner icon element to ensure clear screen reader announcements without redundant text.
