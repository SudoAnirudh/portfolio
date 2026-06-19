## 2025-03-02 - Add Security Headers to Next.js
**Vulnerability:** Missing standard security headers (HSTS, X-Frame-Options, X-Content-Type-Options, etc.), exposing the application to common web vulnerabilities like clickjacking, MIME-sniffing, and XSS.
**Learning:** Next.js allows easy configuration of security headers via the `headers()` async function in `next.config.ts`.
**Prevention:** Always configure security headers in `next.config.ts` for Next.js applications to provide defense in depth.
