## 2024-06-22 - Global Security Headers Configuration
**Vulnerability:** Missing standard security HTTP headers (e.g., X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Referrer-Policy) which leaves the application susceptible to basic attacks like MIME-sniffing, clickjacking, and cross-site scripting (XSS).
**Learning:** In Next.js, standard security headers should be configured globally by returning them from the `async headers()` function in `next.config.ts` to provide defense in depth.
**Prevention:** Always implement an `async headers()` function in `next.config.ts` returning standard security headers applied to `/(.*)` at the start of any Next.js project.
## 2024-05-24 - Window.Open Reverse Tabnabbing
**Vulnerability:** Calling `window.open(url, "_blank")` without specifying `noopener,noreferrer` allows the newly opened tab to retain a reference to `window.opener`, posing a reverse tabnabbing risk on older browsers.
**Learning:** Even if anchor tags use `rel="noopener noreferrer"`, programmatic window opens also need protection.
**Prevention:** Always include `"noopener,noreferrer"` as the third argument when using `window.open` with `"_blank"`.
