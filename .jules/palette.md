## 2025-01-08 - Accessible Retro Media Controls
**Learning:** Custom retro UI components (like media players) often rely heavily on icon-only buttons (`_`, `X`, material symbols) and custom layout structures for volume sliders that lack semantic grouping, causing significant accessibility barriers for screen readers.
**Action:** Always verify that interactive controls in simulated retro interfaces have descriptive `aria-label` attributes (and `aria-hidden="true"` on decorative inner text/icons) and that internal custom form elements are explicitly associated using `id` and `htmlFor`.
