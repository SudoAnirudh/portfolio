## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.
## 2026-07-10 - Keyboard Accessibility for Custom Interactive Divs
**Learning:** When turning a div into an interactive element, missing keyboard event handlers (Enter/Space) and missing focus indicators prevent keyboard users from accessing the functionality. Using `group-focus-visible` alongside `group-hover` is necessary to synchronize the interaction visuals.
**Action:** Replaced `onClick`-only divs with `role="button"`, added `tabIndex={0}`, an `onKeyDown` handler for keyboard activation, and applied `group-focus-visible` styling to ensure a consistent experience.
