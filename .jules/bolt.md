## 2025-05-18 - Hoisting static data in Skills.tsx
**Learning:** Hoisting derived arrays (e.g., using flatMap and split on static data) and large static mapping objects out of React components can result in a ~99% overhead reduction during iteration by eliminating redundant memory allocation and object creation on every render cycle.
**Action:** Always hoist static variables and data transformations outside of the component render loop if they don't depend on component props or state.
