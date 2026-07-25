## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.
## 2024-07-25 - Fix Accessibility of Interactive Cards
**Learning:** Using `div` for clickable cards and nesting `button` elements within them violates HTML semantics and causes accessibility/focus issues for screen readers and keyboard navigation.
**Action:** Always use a single semantic `<button>` for interactive cards with proper `aria-label` and `focus-visible` styling, avoiding nested interactive elements.
