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
## 2026-08-10 - [Security] Add client-side and server-side length validation to optional fields
**Vulnerability:** Missing input validation (specifically length validation) on the optional `subject` field in the contact form, which could allow rudimentary application-layer DoS via oversized payloads.
**Learning:** Even optional fields must have strict length limitations on both the client side (`maxLength`) and server side to prevent malicious actors from submitting massive payloads that exhaust server resources or cause database/API errors.
**Prevention:** Always enforce strict length limits on all user inputs, including optional fields, on both the frontend and backend.
