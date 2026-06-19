## 2024-05-30 - [Material Symbols ARIA Hidden]
**Learning:** The application uses Google Material Symbols which rely on text ligatures (e.g., skip_previous). Screen readers will read the raw text of these icons out loud if not hidden.
**Action:** Always add aria-hidden="true" to the span elements containing these icons and provide aria-label on the parent button.
