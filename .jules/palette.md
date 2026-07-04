## 2024-07-04 - Visible Focus Fallbacks for Custom Controls
**Learning:** When using `focus:outline-none` to suppress default browser outlines on custom icon-only controls (like the TV dials), it inadvertently breaks keyboard accessibility by removing the focus indicator completely.
**Action:** Always replace raw `focus:outline-none` with `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` on interactive elements. This preserves clean mouse interactions while ensuring keyboard navigators can see which element has focus.
