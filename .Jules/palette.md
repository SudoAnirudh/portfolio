## 2024-10-27 - Accessibility: Form Label Associations
**Learning:** Found multiple form inputs without programmatic label associations (missing `htmlFor`/`id`). While visual labels existed, screen readers could not associate them with inputs.
**Action:** When building forms, always ensure `<label>` has `htmlFor` matching the input's `id`, even if they are wrapped in a container.
