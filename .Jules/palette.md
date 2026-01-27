## 2025-02-14 - Missing Focus Utility Classes
**Learning:** The project uses class names like `focus-visible:ring-2` in components (e.g., Navbar) but lacks the corresponding CSS definitions, leading to inaccessible keyboard navigation.
**Action:** Created a `.focus-ring` utility class in `src/index.css` to fill this gap and applied it to the `BuyMeACoffeeWidget`, establishing a pattern for fixing other elements.

## 2025-05-22 - Icon-Only Link Accessibility
**Learning:** Icon-only links (like social media buttons) are invisible to screen readers without `aria-label` attributes. Additionally, relying solely on browser defaults for focus states is often insufficient for keyboard users.
**Action:** Added `aria-label` to all icon-only social links in `Contact.jsx` and applied the `focus-ring` utility class to ensure they are accessible and visible when focused.
