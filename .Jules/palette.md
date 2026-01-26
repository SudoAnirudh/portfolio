## 2025-02-14 - Missing Focus Utility Classes
**Learning:** The project uses class names like `focus-visible:ring-2` in components (e.g., Navbar) but lacks the corresponding CSS definitions, leading to inaccessible keyboard navigation.
**Action:** Created a `.focus-ring` utility class in `src/index.css` to fill this gap and applied it to the `BuyMeACoffeeWidget`, establishing a pattern for fixing other elements.
