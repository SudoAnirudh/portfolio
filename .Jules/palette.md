## 2024-05-21 - Missing Form Label Associations
**Learning:** Found forms where labels lacked `htmlFor` and inputs lacked `id` attributes. This breaks accessibility for screen readers and reduces usability (clicking label doesn't focus input).
**Action:** Always verify form inputs have corresponding `id`s and labels have matching `htmlFor` attributes during implementation.
