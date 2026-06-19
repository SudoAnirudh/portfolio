## 2026-06-19 - [Hoist Derived Arrays & Static Maps in React Components]
**Learning:** Recreating static maps or computing derived arrays (e.g. `flatMap` operations on static data) inside a React component causes redundant memory allocations on every render cycle.
**Action:** Always hoist static maps and pure derived array computations outside of the component body to reduce memory pressure and improve rendering performance, particularly for lists or grids.
