## 2026-06-23 - RetroMusicPlayer accessibility improvements
**Learning:** The RetroMusicPlayer component lacked ARIA labels on icon-only playback and window control buttons, and the volume slider label was disconnected from the input element.
**Action:** Added aria-label, title, and aria-hidden attributes to icon buttons, and linked the volume label to its input using htmlFor and id to improve screen reader accessibility.
