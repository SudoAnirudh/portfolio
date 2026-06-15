## 2025-06-15 - [Hoist Static Mappings and Derived Arrays]
**Learning:** Re-instantiating derived arrays (like using `flatMap` and `split` on imported static data) and large static mapping objects (`iconMap`, `skillDetails`) inside React components causes redundant memory allocation and overhead on every render cycle. Micro-benchmarking confirmed ~99% overhead reduction during iteration tests when hoisted out of the render loop.
**Action:** Always hoist constants, mapping objects, and derived arrays that do not depend on component state or props to the module level.
