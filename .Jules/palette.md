## 2025-02-14 - Missing Focus Utility Classes
**Learning:** The project uses class names like `focus-visible:ring-2` in components (e.g., Navbar) but lacks the corresponding CSS definitions, leading to inaccessible keyboard navigation.
**Action:** Created a `.focus-ring` utility class in `src/index.css` to fill this gap and applied it to the `BuyMeACoffeeWidget`, establishing a pattern for fixing other elements.

## 2024-10-24 - Standardizing Focus Indicators
**Learning:** The project relies on a custom `.focus-ring` utility class in `src/index.css` instead of Tailwind's `focus-visible:*` utilities directly. This ensures consistency across components.
**Action:** When adding or modifying interactive elements, always apply the `.focus-ring` class and verify it works with the defined CSS variable `--accent`. Avoid inline styles like `outline: none` which break accessibility.
