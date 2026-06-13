## 2024-05-24 - [HTML Injection in Email Templates]
**Vulnerability:** User inputs (name, email, message) were directly interpolated into HTML strings in the `contact.ts` server action before being sent via Resend. This allowed malicious users to submit HTML/script tags that would render in the recipient's email client.
**Learning:** Even internal notification emails sent via APIs like Resend require HTML sanitization to prevent XSS and HTML injection, especially when user input is displayed back to the user or an administrator.
**Prevention:** Always sanitize/escape user inputs before interpolating them into HTML templates, even for emails. Ensure escaping happens *before* applying text transformations like replacing newlines with `<br>`.
