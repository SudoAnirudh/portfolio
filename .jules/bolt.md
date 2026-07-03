## 2026-07-01 - [Hoist Static Data in React Components]
**Learning:** In React components that iterate over static data derived from props or external imports (like `flatMap` and `split` operations), performing these operations inside the render loop causes significant unnecessary overhead. In this codebase's `Skills` component, micro-benchmarking showed a massive difference (e.g., ~340ms vs ~2ms for 100k iterations) by simply moving derived arrays and static configuration objects out of the component scope.
**Action:** Always hoist static, non-changing data structures (like maps, config objects, or arrays computed strictly from static imports) out of React components to avoid re-allocation and re-computation on every render.

## 2026-07-01 - [Optimize High-Frequency Render Loops]
**Learning:** For high-frequency render loops (e.g., ASCII animations running every 50-80ms), generating strings via nested array methods (`.map().join()`) creates significant garbage collection overhead and memory thrashing due to continuous allocation of intermediate arrays. In micro-benchmarks, building frames using direct string concatenation in a double `for` loop reduced execution time by approximately 50-60%.
**Action:** When implementing high-frequency programmatic text/ASCII animations in React, generate the final frame string using standard `for` loops and string concatenation instead of array map/reduce/join operations.

## 2026-07-03 - [Web Audio API Optimization]
**Learning:** Repeatedly instantiating `AudioContext` without closing the previous instances leads to memory leaks and can cause the browser to crash when hitting the hardware limit (~6 active contexts). Generating `AudioBuffer` programmatically in a loop for every playback creates significant redundant processing.
**Action:** Lazily initialize and cache the `AudioContext` globally (e.g., as a module-level singleton or via a ref/state) to prevent exceeding active context limits, and cache `AudioBuffer`s intended for repeated use.
