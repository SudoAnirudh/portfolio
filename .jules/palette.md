## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.
## 2026-07-20 - Semantic buttons for interactive cards
**Learning:** Using <div onClick> for interactive cards breaks keyboard navigation and screen reader support. Nesting interactive elements like <button> inside another <button> also causes accessibility issues.
**Action:** Use semantic <button> elements with appropriate aria-labels and focus-visible states for clickable cards. Replace nested interactive elements with semantic non-interactive equivalents like <span>.
