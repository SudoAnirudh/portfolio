## 2024-05-18 - [Hoist large static arrays and maps from React components]
**Learning:** Found an anti-pattern in `Skills.tsx` where a large derived static array (`flatMap` and `split` on imported data) and maps (`skillDetails`, `iconMap`) were being initialized inside the component function. This forced re-allocation and re-derivation on every render, adding up to ~283ms overhead in tight loops vs 3ms when hoisted.
**Action:** Always hoist static data arrays and configuration maps outside of React functional components to the module level.
