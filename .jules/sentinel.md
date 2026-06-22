## 2024-06-22 - Global Security Headers Configuration
**Vulnerability:** Missing standard security HTTP headers (e.g., X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Referrer-Policy) which leaves the application susceptible to basic attacks like MIME-sniffing, clickjacking, and cross-site scripting (XSS).
**Learning:** In Next.js, standard security headers should be configured globally by returning them from the `async headers()` function in `next.config.ts` to provide defense in depth.
**Prevention:** Always implement an `async headers()` function in `next.config.ts` returning standard security headers applied to `/(.*)` at the start of any Next.js project.
