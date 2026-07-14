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
## 2024-05-18 - Form and Social Links Accessibility Improvements
**Learning:** In the `Contact.tsx` component, form inputs were relying solely on placeholders without `<label>` elements, which breaks screen reader support. Social icons were missing `aria-label`s, and text inside `span` with `material-symbols-outlined` was being read by screen readers.
**Action:** Always provide `<label>` elements (using `sr-only` class if they should be visually hidden) for inputs, associate error states using `aria-invalid` and `aria-describedby`, add `aria-label` to icon-only links, and use `aria-hidden="true"` on the internal icon elements to prevent redundant reading. Also ensure external links include `target="_blank" rel="noopener noreferrer"` for security.
## 2025-05-24 - Focus Outline Anti-Pattern and Playwright Scrolling
**Learning:** The project relies on the anti-pattern `focus:outline-none` across multiple components (Contact.tsx, HelloWorld.tsx, Skills.tsx), which removes native accessibility indicators without providing an alternative. Additionally, when verifying lower-page components with Playwright, the script must explicitly scroll to trigger any lazy loading or render observers.
**Action:** Replace `focus:outline-none` with `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-yellow` directly on interactive elements. When using Playwright to test components like the Contact form, include `page.evaluate('window.scrollTo(0, document.body.scrollHeight)')` before interacting with the elements.
