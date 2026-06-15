## 2024-05-24 - [HTML Injection in Email Templates]
**Vulnerability:** User inputs (name, email, message) were directly interpolated into HTML strings in the `contact.ts` server action before being sent via Resend. This allowed malicious users to submit HTML/script tags that would render in the recipient's email client.
**Learning:** Even internal notification emails sent via APIs like Resend require HTML sanitization to prevent XSS and HTML injection, especially when user input is displayed back to the user or an administrator.
**Prevention:** Always sanitize/escape user inputs before interpolating them into HTML templates, even for emails. Ensure escaping happens *before* applying text transformations like replacing newlines with `<br>`.

## 2024-06-14 - [JSON-LD XSS & Reverse Tabnabbing]
**Vulnerability:** Stringified JSON-LD was injected into a script tag using `dangerouslySetInnerHTML` without escaping, allowing XSS. Additionally, `target="_blank"` links in Hero component lacked `rel="noopener noreferrer"`, exposing a reverse tabnabbing vulnerability.
**Learning:** `JSON.stringify` does not escape `<` characters, so a malicious input could prematurely close a `<script>` block and inject executable code. For tabnabbing, any new tab opened via target blank retains access to the window opener unless explicitly blocked.
**Prevention:** Sanitize JSON strings before DOM injection using `.replace(/</g, '\\u003c')`. Always add `rel="noopener noreferrer"` to dynamically or statically generated `target="_blank"` anchor tags.

## 2024-08-09 - [Missing Server-Side Input Validation in Email Action]
**Vulnerability:** The server action `submitContactForm` did not strictly validate the length or format of the incoming `name`, `email`, and `message` payloads, beyond a simple presence check. This could allow excessive payload submissions leading to Denial of Service (DoS) or unexpected downstream behavior when processed by Resend or the email client.
**Learning:** Client-side validation can always be bypassed. Server actions (like `submitContactForm`) are public APIs and must independently enforce structural limits and sanity checks on all inputs.
**Prevention:** Always implement server-side validation. Enforce reasonable bounds (e.g., max 100 chars for name, 5000 for message) and format validation (e.g., regex for email) before processing or storing user data.
