## 2024-06-22 - Global Security Headers Configuration
**Vulnerability:** Missing standard security HTTP headers (e.g., X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Referrer-Policy) which leaves the application susceptible to basic attacks like MIME-sniffing, clickjacking, and cross-site scripting (XSS).
**Learning:** In Next.js, standard security headers should be configured globally by returning them from the `async headers()` function in `next.config.ts` to provide defense in depth.
**Prevention:** Always implement an `async headers()` function in `next.config.ts` returning standard security headers applied to `/(.*)` at the start of any Next.js project.

## 2026-06-29 - Prevent Reverse Tabnabbing and Missing CSP Header
**Vulnerability:** The application was missing a Content-Security-Policy header in `next.config.ts`, increasing the risk of Cross-Site Scripting (XSS) and data injection. Additionally, `window.open` calls were missing the `noopener,noreferrer` parameters.
**Learning:** Even static portfolios and low-interaction sites should implement a CSP header as defense in depth against XSS. Further, whenever programmatically opening new windows via `window.open(url, "_blank")`, it's critical to include `"noopener,noreferrer"` to prevent reverse tabnabbing vulnerabilities where the newly opened window could access and manipulate `window.opener`.
**Prevention:** Include a CSP in the Next.js `headers()` configuration, and always use the third parameter `"noopener,noreferrer"` for `window.open` calls.
