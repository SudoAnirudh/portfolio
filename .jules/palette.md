## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.

## 2024-07-11 - Replace focus:outline-none with focus-visible fallbacks
**Learning:** Using `focus:outline-none` removes the default focus indicator, which hurts keyboard navigation accessibility if no visible fallback is provided. Interactive elements should use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-yellow` to ensure users navigating via keyboard can see which element is active.
**Action:** Always replace `focus:outline-none` on interactive elements with `focus-visible` styles that provide a clear visual indicator.
