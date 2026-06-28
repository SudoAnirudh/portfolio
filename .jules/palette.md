## 2024-10-27 - [Add ARIA labels to RetroMusicPlayer]
**Learning:** Found a pattern in retro UI components (`RetroMusicPlayer.tsx`) where icon-only buttons (minimize, close, playback controls) lacked `aria-label`s. In addition, internal form elements like the volume slider lacked explicitly associated labels.
**Action:** Always verify that icon-only interactive controls (minimize, close, playback) have descriptive `aria-label` attributes, and internal custom form elements are correctly associated with labels using `id` and `htmlFor`. Hide decorative or textual icons with `aria-hidden="true"`.
