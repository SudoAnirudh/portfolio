## 2024-05-21 - Missing Form Label Associations
**Learning:** Found forms where labels lacked `htmlFor` and inputs lacked `id` attributes. This breaks accessibility for screen readers and reduces usability (clicking label doesn't focus input).
**Action:** Always verify form inputs have corresponding `id`s and labels have matching `htmlFor` attributes during implementation.

## 2024-05-21 - Interactive Elements Disguised as Text
**Learning:** The "surprise dot" was implemented as a `<span>` with an `onClick` handler. This makes it inaccessible to keyboard users and screen readers, who can't tab to it or know it's interactive.
**Action:** When creating "Easter eggs" or subtle interactive elements, always use a `<button>` tag styled to look like text (remove border/bg), and include `aria-label` and focus styles.
