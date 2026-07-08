## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.

## 2024-07-08 - Accessible Keyboard Navigation Focus Fallbacks
**Learning:** Hardcoding `focus:outline-none` to remove native focus rings causes critical accessibility regressions for keyboard users when navigating custom interactive UI components.
**Action:** Always replace `focus:outline-none` with `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` on interactive components to preserve visual focus state without compromising mouse interactions.
