
## 2026-07-05 - [Add ARIA labels to Custom Retro UI Controls]
**Learning:** Custom UI elements like TV knobs and simulated window close buttons often lack inherent text and rely on visual design, making them inaccessible to screen readers. Relying on `title` is insufficient for accessibility. Also, `focus:outline-none` removes keyboard focus visibility, harming navigation.
**Action:** Explicitly add descriptive `aria-label` attributes to icon-only buttons. Add `aria-hidden="true"` to material-symbol span elements inside buttons. Replace `focus:outline-none` with `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` to maintain aesthetics for mouse users while providing clear focus states for keyboard users.
