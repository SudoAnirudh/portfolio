## 2024-05-24 - Accessibility for Text-Based Icons in Custom Retro UI
**Learning:** Custom retro UI components (like simulated OS windows) using text-based icon fonts require both `aria-label` on the control and `aria-hidden="true"` on the icon element to prevent redundant or confusing screen reader output, alongside explicit `focus-visible` styling for keyboard navigation.
**Action:** Always add `aria-hidden="true"` to text-based icons (e.g. material-symbols) inside buttons/links, provide a descriptive `aria-label` on the parent, and ensure a clear `focus-visible` fallback is styled.
