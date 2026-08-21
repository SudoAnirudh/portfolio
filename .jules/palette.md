## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.
## 2026-07-31 - Missing ARIA Labels on Custom Window Headers
**Learning:** Custom UI components resembling retro OS windows often rely on icon-only close buttons (like the `close` symbol) in their headers, which lack accessible names and keyboard focus indicators, making them invisible to screen readers and difficult to navigate via keyboard.
**Action:** Always verify that icon-only interactive controls (like minimize, maximize, and close) in custom window headers explicitly provide descriptive `aria-label` attributes and visible focus states (`focus-visible:ring-2`).
