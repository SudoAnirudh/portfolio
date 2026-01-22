## 2024-05-21 - Missing Form Label Associations
**Learning:** Found forms where labels lacked `htmlFor` and inputs lacked `id` attributes. This breaks accessibility for screen readers and reduces usability (clicking label doesn't focus input).
**Action:** Always verify form inputs have corresponding `id`s and labels have matching `htmlFor` attributes during implementation.

## 2024-05-21 - Accessible Interactives
**Learning:** Found a clickable `span` used for a button-like interaction ("Surprise color change"). This is inaccessible to keyboard users.
**Action:** Always use semantic `<button>` elements for interactions, or ensure `role="button"` and `onKeyDown` handlers are present if `button` cannot be used. Nesting interactive elements (like `button` inside `a`) is invalid HTML; use sibling elements or wrappers instead.
