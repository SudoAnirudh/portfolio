## 2024-06-13 - [Hoisting static constants in React Components]
**Learning:** Instantiating large constant arrays and mappings inside a React component's body causes significant performance overhead (e.g. 350ms vs 20ms for 100k iterations) because they are re-created on every render cycle.
**Action:** Move static data structures (`skillsList`, `skillDetails`, `iconMap`) out of the React component function scope (i.e. to the module level) to prevent redundant allocation and mapping/splitting operations.
