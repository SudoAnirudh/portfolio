## $(date +%Y-%m-%d) - [Hoist Static Data in React Components]
**Learning:** In React components that iterate over static data derived from props or external imports (like `flatMap` and `split` operations), performing these operations inside the render loop causes significant unnecessary overhead. In this codebase's `Skills` component, micro-benchmarking showed a massive difference (e.g., ~340ms vs ~2ms for 100k iterations) by simply moving derived arrays and static configuration objects out of the component scope.
**Action:** Always hoist static, non-changing data structures (like maps, config objects, or arrays computed strictly from static imports) out of React components to avoid re-allocation and re-computation on every render.

## 2025-07-04 - Eliminate Intermediate Array Allocations in Render Loops
**Learning:** In high-frequency React component render loops (e.g., ASCII animations running every 80ms), chaining `.map()` and `.join()` for string manipulation creates multiple intermediate array copies, causing significant garbage collection pauses and memory overhead.
**Action:** Replace `Array.map().join()` chains inside hot paths with direct string concatenation within a `for` loop, eliminating array allocation overhead and improving iteration speed by up to 45% based on benchmarking.
