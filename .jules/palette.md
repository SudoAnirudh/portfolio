## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.

## 2026-08-03 - Add Visual Indicators to Required Form Fields
**Learning:** When form fields use the `required` attribute, users and screen readers benefit from an explicit visual indicator appended directly inside the corresponding `<label>` element to communicate the requirement effectively.
**Action:** Always append `<span className="text-red-500 ml-1" aria-hidden="true">*</span>` inside the `<label>` for any required input field.
