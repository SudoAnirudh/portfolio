## 2025-02-14 - Missing Focus Utility Classes
**Learning:** The project uses class names like `focus-visible:ring-2` in components (e.g., Navbar) but lacks the corresponding CSS definitions, leading to inaccessible keyboard navigation.
**Action:** Created a `.focus-ring` utility class in `src/index.css` to fill this gap and applied it to the `BuyMeACoffeeWidget`, establishing a pattern for fixing other elements.

## 2024-10-24 - Standardizing Focus Indicators
**Learning:** The project relies on a custom `.focus-ring` utility class in `src/index.css` instead of Tailwind's `focus-visible:*` utilities directly. This ensures consistency across components.
**Action:** When adding or modifying interactive elements, always apply the `.focus-ring` class and verify it works with the defined CSS variable `--accent`. Avoid inline styles like `outline: none` which break accessibility.

## 2025-05-15 - Contact Form Accessibility Pattern
**Learning:** Forms in this project may have labels that are not programmatically associated with inputs (missing `htmlFor`/`id`), and inputs often have `focus:outline-none` which removes accessibility.
**Action:** When touching forms, always ensure labels have `htmlFor` matching the input `id`, and replace `outline:none` with `focus-visible:ring-2` (using `focus-visible:ring-accent`).

## 2026-02-03 - Required Field Visual Pattern
**Learning:** While inputs used the `required` attribute, they lacked visual indicators, relying solely on browser validation.
**Action:** Standardize on appending `<span className="text-red-500 ml-1" aria-hidden="true">*</span>` to the label of any required input field to improve usability.

## 2025-02-15 - Direct Tailwind Focus Utilities Preferred
**Learning:** The custom `.focus-ring` class mentioned in previous journal entries was missing from the codebase. Using direct Tailwind utility classes `focus-visible:ring-2 focus-visible:ring-accent` provides a consistent and working solution without needing custom CSS.
**Action:** Use `focus-visible:ring-2 focus-visible:ring-accent` directly on interactive elements.

## 2026-10-14 - Dynamic Content Focus Management
**Learning:** When replacing content dynamically (like showing a success message in place of a form), focus is often lost, confusing screen reader and keyboard users. Also, "Try Again" or reset buttons often lack focus styles.
**Action:** When implementing reset flows, use `useRef` and `useEffect` to programmatically move focus to the first interactive element of the restored content, and ensure all state-change buttons have visible focus rings.

## 2025-05-23 - Spinner Accessibility & Build Artifacts
**Learning:** Decorative SVG icons (like loading spinners) inside interactive elements must include `aria-hidden="true"` to prevent redundant screen reader announcements. Also, `next-env.d.ts` is auto-generated and should be excluded from commits.
**Action:** Always add `aria-hidden="true"` to decorative SVGs and check `git status` for auto-generated files before committing.

## 2027-01-20 - Dead Code Removal
**Learning:** Unused imports increase cognitive load and can clutter the codebase. Even if tree-shaking handles them during build, they should be removed to improve maintainability and readability.
**Action:** Regularly audit and remove unused imports and components.
