## $(date +%Y-%m-%d) - [Hoist Static Data in React Components]
**Learning:** In React components that iterate over static data derived from props or external imports (like `flatMap` and `split` operations), performing these operations inside the render loop causes significant unnecessary overhead. In this codebase's `Skills` component, micro-benchmarking showed a massive difference (e.g., ~340ms vs ~2ms for 100k iterations) by simply moving derived arrays and static configuration objects out of the component scope.
**Action:** Always hoist static, non-changing data structures (like maps, config objects, or arrays computed strictly from static imports) out of React components to avoid re-allocation and re-computation on every render.

## 2025-06-27 - [Avoid Array Operations for High-Frequency String Generation]
**Learning:** For high-frequency render loops (like ASCII animations running at ~12 FPS/80ms), using `array.map(row => row.join('')).join('\n')` for string generation causes significant garbage collection overhead and execution delay due to the continuous allocation of intermediate arrays.
**Action:** Use direct string concatenation within a nested `for` loop to build final multiline strings directly, eliminating intermediate array objects and minimizing GC spikes in performance-sensitive logic.
