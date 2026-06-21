## 2026-06-21 - Add Global Security Headers
**Vulnerability:** Missing HTTP security headers (e.g., X-Frame-Options, X-Content-Type-Options, etc.), exposing the application to clickjacking, MIME sniffing, and XSS attacks.
**Learning:** Next.js provides a built-in `headers()` function in `next.config.ts` that can enforce security policies globally across all routes.
**Prevention:** Implement standard HTTP security headers to provide defense in depth against multiple web vulnerabilities.
