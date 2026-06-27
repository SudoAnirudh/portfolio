## 2024-06-22 - Global Security Headers Configuration
**Vulnerability:** Missing standard security HTTP headers (e.g., X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Referrer-Policy) which leaves the application susceptible to basic attacks like MIME-sniffing, clickjacking, and cross-site scripting (XSS).
**Learning:** In Next.js, standard security headers should be configured globally by returning them from the `async headers()` function in `next.config.ts` to provide defense in depth.
**Prevention:** Always implement an `async headers()` function in `next.config.ts` returning standard security headers applied to `/(.*)` at the start of any Next.js project.
## 2025-02-24 - [Mitigate Reverse Tabnabbing in Receipt Printer]
**Vulnerability:** Reverse tabnabbing via `window.open` missing `noopener,noreferrer` parameters.
**Learning:** Even programmatic link openings (via `window.open` rather than `<a target="_blank">`) can be vulnerable to `window.opener` abuse if the third argument is omitted.
**Prevention:** Always append `"noopener,noreferrer"` as the third string argument when using `window.open(url, "_blank")`.
