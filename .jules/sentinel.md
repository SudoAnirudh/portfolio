## 2024-06-22 - Global Security Headers Configuration
**Vulnerability:** Missing standard security HTTP headers (e.g., X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Referrer-Policy) which leaves the application susceptible to basic attacks like MIME-sniffing, clickjacking, and cross-site scripting (XSS).
**Learning:** In Next.js, standard security headers should be configured globally by returning them from the `async headers()` function in `next.config.ts` to provide defense in depth.
**Prevention:** Always implement an `async headers()` function in `next.config.ts` returning standard security headers applied to `/(.*)` at the start of any Next.js project.
## 2025-02-20 - Missing Content-Security-Policy and Reverse Tabnabbing via window.open
**Vulnerability:** The application was missing a Content-Security-Policy (CSP) header, which is a critical defense-in-depth mechanism against Cross-Site Scripting (XSS). Additionally, a programmatic call to `window.open` in `src/components/ReceiptPrinter.tsx` lacked the `"noopener,noreferrer"` parameters, making it susceptible to reverse tabnabbing (where the opened window can manipulate the `window.opener` object).
**Learning:** Next.js global headers should always include a CSP configuration. While static HTML links might often have `target="_blank" rel="noopener noreferrer"`, it is easy to overlook these protections in programmatic JavaScript API calls like `window.open`.
**Prevention:** Always verify that `window.open(..., '_blank')` calls include `"noopener,noreferrer"` as the third argument. Ensure standard security headers, specifically CSP, are explicitly defined in Next.js configuration or middleware.

## 2026-08-01 - [Security] Add client-side maxLength to form inputs
**Vulnerability:** Missing client-side length validation on contact form inputs.
**Learning:** Client-side inputs lacked maxLength attributes corresponding to server-side constraints in actions/contact.ts, which could allow rudimentary application-layer DoS via oversized payloads.
**Prevention:** Always ensure client-side form inputs enforce maxLength attributes explicitly aligned with their server-side validation counterparts.

## $(date +%Y-%m-%d) - [Security] Enforce Server and Client Validation Length Parity for DoS Prevention
**Vulnerability:** The application was susceptible to rudimentary application-layer DoS attacks via oversized payloads because length constraints applied on the server (in `actions/contact.ts`) did not encompass all form fields (e.g., `subject` was ignored), and the client-side implementation (in `Contact.tsx`) similarly lacked a corresponding `maxLength` enforcement.
**Learning:** Security validations on form fields, especially length constraints (e.g., `<input maxLength={200} />`), must always maintain strict parity between the client-side UI and server-side action handlers to prevent resource exhaustion and data truncation errors.
**Prevention:** Systematically enforce explicitly matched maximum length limits (e.g., `maxLength`) on all client-side inputs, including optional ones, corresponding exactly to robust server-side validation checks before interacting with external APIs like Resend.
