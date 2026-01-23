## 2024-05-21 - Missing Form Label Associations
**Learning:** Found forms where labels lacked `htmlFor` and inputs lacked `id` attributes. This breaks accessibility for screen readers and reduces usability (clicking label doesn't focus input).
**Action:** Always verify form inputs have corresponding `id`s and labels have matching `htmlFor` attributes during implementation.

## 2024-05-22 - Contact Form Focus States
**Learning:** Found inputs with inline styles setting `outline: none` without any replacement focus state, rendering them invisible to keyboard users.
**Action:** When refactoring inline styles, always ensure interactive elements have a clear `:focus` or `:focus-visible` state defined in CSS.
