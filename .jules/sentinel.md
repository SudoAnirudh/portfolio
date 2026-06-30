## 2024-06-22 - Global Security Headers Configuration
**Vulnerability:** Missing standard security HTTP headers (e.g., X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Referrer-Policy) which leaves the application susceptible to basic attacks like MIME-sniffing, clickjacking, and cross-site scripting (XSS).
**Learning:** In Next.js, standard security headers should be configured globally by returning them from the `async headers()` function in `next.config.ts` to provide defense in depth.
**Prevention:** Always implement an `async headers()` function in `next.config.ts` returning standard security headers applied to `/(.*)` at the start of any Next.js project.
## 2025-02-14 - Prevent Reverse Tabnabbing in `window.open`
**Vulnerability:** A `window.open` call in `src/components/ReceiptPrinter.tsx` omitted the `"noopener,noreferrer"` argument, leaving the application open to reverse tabnabbing attacks where the newly opened window could manipulate `window.opener`.
**Learning:** Even programmatic navigation needs protection from reverse tabnabbing. It's not limited to just static HTML `<a>` tags.
**Prevention:** Always use `window.open(url, "_blank", "noopener,noreferrer")` when opening untrusted or external links in a new window/tab.
