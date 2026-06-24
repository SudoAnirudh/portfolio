## 2024-11-20 - [ARIA Hidden on Text-Based Icons]
**Learning:** When adding `aria-label` to icon-only buttons that contain text-based icon fonts (like `material-symbols-outlined`), screen readers may redundantly read the raw text of the icon (e.g., "skip_previous") if it is not hidden.
**Action:** Always apply `aria-hidden="true"` to the inner `<span>` element containing the icon text to ensure the screen reader only reads the intended `aria-label` on the parent button.
