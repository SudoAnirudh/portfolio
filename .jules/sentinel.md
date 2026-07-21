## 2024-06-22 - Global Security Headers Configuration
**Vulnerability:** Missing standard security HTTP headers (e.g., X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Referrer-Policy) which leaves the application susceptible to basic attacks like MIME-sniffing, clickjacking, and cross-site scripting (XSS).
**Learning:** In Next.js, standard security headers should be configured globally by returning them from the `async headers()` function in `next.config.ts` to provide defense in depth.
**Prevention:** Always implement an `async headers()` function in `next.config.ts` returning standard security headers applied to `/(.*)` at the start of any Next.js project.
## 2025-02-20 - Missing Content-Security-Policy and Reverse Tabnabbing via window.open
**Vulnerability:** The application was missing a Content-Security-Policy (CSP) header, which is a critical defense-in-depth mechanism against Cross-Site Scripting (XSS). Additionally, a programmatic call to `window.open` in `src/components/ReceiptPrinter.tsx` lacked the `"noopener,noreferrer"` parameters, making it susceptible to reverse tabnabbing (where the opened window can manipulate the `window.opener` object).
**Learning:** Next.js global headers should always include a CSP configuration. While static HTML links might often have `target="_blank" rel="noopener noreferrer"`, it is easy to overlook these protections in programmatic JavaScript API calls like `window.open`.
**Prevention:** Always verify that `window.open(..., '_blank')` calls include `"noopener,noreferrer"` as the third argument. Ensure standard security headers, specifically CSP, are explicitly defined in Next.js configuration or middleware.
## 2026-07-21 - [Client-Side DoS Prevention via Length Limits]
**Vulnerability:** Missing client-side length restrictions on contact form inputs could allow users to paste extremely large payloads, potentially causing browser lag or crashing before server-side limits hit.
**Learning:** While server-side validation is implemented, client-side input restrictions (`maxLength`) must explicitly align with server counterparts to provide defense in depth and mitigate client-side resource exhaustion.
**Prevention:** Always pair server-side length limits (e.g., DoS protections) with matching HTML `maxLength` attributes on client forms.
