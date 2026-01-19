## 2025-02-27 - Connect Labels to Inputs
**Learning:** Even with visible labels, screen readers often fail to associate them with inputs unless `htmlFor` and `id` explicitly match. This is a common oversight in React where simple `<label>Text <input /></label>` wrapping is sometimes assumed to be enough (it is valid HTML, but explicit association is more robust and allows for more styling flexibility).
**Action:** Always verify form accessibility by ensuring every `input` has a corresponding `label` with a matching `htmlFor` attribute.
