# Palette's Journal

## 2025-10-26 - Accessible Mobile Navigation
**Learning:** Mobile menu toggles often lack `aria-expanded` and `aria-controls`, making them confusing for screen reader users who don't know if the menu is open or what it controls.
**Action:** Always add `aria-label`, `aria-expanded`, and `aria-controls` to hamburger buttons, and ensure the menu container has the corresponding ID.
