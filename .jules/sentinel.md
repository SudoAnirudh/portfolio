## 2024-06-22 - Global Security Headers Configuration
**Vulnerability:** Missing standard security HTTP headers (e.g., X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Referrer-Policy) which leaves the application susceptible to basic attacks like MIME-sniffing, clickjacking, and cross-site scripting (XSS).
**Learning:** In Next.js, standard security headers should be configured globally by returning them from the `async headers()` function in `next.config.ts` to provide defense in depth.
**Prevention:** Always implement an `async headers()` function in `next.config.ts` returning standard security headers applied to `/(.*)` at the start of any Next.js project.

## 2024-06-25 - Reverse Tabnabbing Vulnerability via window.open
**Vulnerability:** A `window.open(url, "_blank")` call missing the third `features` argument with `"noopener,noreferrer"`. This exposes the application to reverse tabnabbing, where the newly opened window gains a reference to the `window.opener` object, potentially allowing a malicious site to navigate the original tab to a phishing or otherwise malicious page.
**Learning:** Even programmatic navigation (using JavaScript's `window.open` rather than standard HTML anchor tags) that opens a new tab must be explicitly secured against cross-window manipulation to ensure defense in depth.
**Prevention:** Always provide `"noopener,noreferrer"` as the third parameter to `window.open(url, '_blank')` to break the connection between the originating and new windows, just as `rel="noopener noreferrer"` does for HTML `<a>` tags.
