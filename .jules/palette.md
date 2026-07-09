## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.

## 2024-05-24 - Provide focus-visible fallbacks
**Learning:** Using `focus:outline-none` without providing alternative focus styles makes interactive elements completely invisible to keyboard users when navigating.
**Action:** Always replace `focus:outline-none` with accessible alternatives like `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-yellow` to maintain design aesthetics while preserving keyboard accessibility.
