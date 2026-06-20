## 2026-06-20 - Ensure Global Security Headers Configuration in Next.js
**Vulnerability:** The Next.js application was missing standard HTTP security headers (e.g., `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `X-XSS-Protection`, `Referrer-Policy`), leaving the application exposed to clickjacking, MIME-sniffing, and other web vulnerabilities.
**Learning:** In Next.js, standard security headers should be explicitly configured globally in `next.config.ts` using the `async headers()` function to provide defense in depth across all routes.
**Prevention:** Always verify that `next.config.ts` includes an implementation of `async headers()` returning standard HTTP security headers applying to `/(.*)`.
