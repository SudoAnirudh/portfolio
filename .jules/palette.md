## 2026-07-07 - Add ARIA Labels to Custom OS Components
**Learning:** Icon-only interactive controls and text-based icon fonts (like material-symbols-outlined) in custom retro UI components must explicitly implement `aria-label` and `aria-hidden='true'` to prevent screen readers from reading literal icon text, and custom form inputs must be linked to labels via `id`/`htmlFor`.
**Action:** Always add descriptive `aria-label` to icon buttons, apply `aria-hidden='true'` to their internal text-based icon spans, and associate form inputs correctly.

## $(date +%Y-%m-%d) - Adding Required Indicators to Form Fields
**Learning:** For Next.js development within this workspace, modifying a file and subsequently running `pnpm build` will often cause auto-generated changes to `next-env.d.ts`. Committing this generated file creates unnecessary version control noise and shouldn't be included in UX PRs.
**Action:** Always ensure that after running build or test commands locally during verification, the `next-env.d.ts` file modifications are discarded using `git restore --staged next-env.d.ts && git checkout next-env.d.ts` before creating the final PR to maintain a clean git history.
