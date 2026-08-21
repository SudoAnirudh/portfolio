## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.
## 2026-08-05 - [Required Field Indicators]
**Learning:** When form fields use the `required` attribute, explicitly define a visual indicator by appending `<span className="text-red-500 ml-1" aria-hidden="true">*</span>` directly inside the corresponding `<label>` element to enhance usability without compromising accessibility.
**Action:** Always verify if a visual indicator is present for required inputs, and ensure it uses `aria-hidden="true"` to prevent screen reader redundancy.
