## 2024-07-02 - Retro UI Component Accessibility Improvement
**Learning:** When modifying custom retro UI components (e.g., simulated OS windows or media players), explicitly verify that icon-only interactive controls (minimize, close, playback) have descriptive `aria-label` attributes, and internal custom form elements are correctly associated with labels using `id` and `htmlFor`.
**Action:** Always add `aria-hidden="true"` to text-based icons when using `aria-label` on their parent buttons to prevent double-reading by screen readers.
