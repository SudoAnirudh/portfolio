## 2026-07-01 - [Hoist Static Data in React Components]
**Learning:** In React components that iterate over static data derived from props or external imports (like `flatMap` and `split` operations), performing these operations inside the render loop causes significant unnecessary overhead. In this codebase's `Skills` component, micro-benchmarking showed a massive difference (e.g., ~340ms vs ~2ms for 100k iterations) by simply moving derived arrays and static configuration objects out of the component scope.
**Action:** Always hoist static, non-changing data structures (like maps, config objects, or arrays computed strictly from static imports) out of React components to avoid re-allocation and re-computation on every render.

## 2026-07-01 - [Optimize High-Frequency Render Loops]
**Learning:** For high-frequency render loops (e.g., ASCII animations running every 50-80ms), generating strings via nested array methods (`.map().join()`) creates significant garbage collection overhead and memory thrashing due to continuous allocation of intermediate arrays. In micro-benchmarks, building frames using direct string concatenation in a double `for` loop reduced execution time by approximately 50-60%.
**Action:** When implementing high-frequency programmatic text/ASCII animations in React, generate the final frame string using standard `for` loops and string concatenation instead of array map/reduce/join operations.
## 2026-07-02 - [Cache AudioContext and AudioBuffer to Prevent Crashes and Overhead]
**Learning:** Browsers enforce a strict limit on the number of concurrently active \`AudioContext\` instances (~6). Repeatedly instantiating \`new window.AudioContext()\` on events like clicks or hover will quickly lead to hardware limit crashes ("Failed to construct 'AudioContext': The number of hardware contexts provided..."). Additionally, repeatedly allocating \`AudioBuffer\` and looping through \`getChannelData\` for white noise on every play triggers garbage collection overhead and drops frames in high-frequency triggers.
**Action:** When implementing sound effects using the Web Audio API, always lazily initialize and cache a single module-level or global \`AudioContext\` singleton. For static or algorithmically generated sound buffers (like white noise), compute and cache the \`AudioBuffer\` once rather than re-allocating and re-calculating the buffer on every invocation.

## 2026-07-09 - [Optimize Next.js Images with sizes attribute]
**Learning:** When using Next.js <Image> with the `fill` property, omitting the `sizes` attribute causes Next.js to serve unnecessarily large, unoptimized images to smaller viewports because it assumes the image will take up the full width of the screen. This increases bandwidth usage and slows down page load times, especially on mobile devices.
**Action:** Always provide a `sizes` attribute (e.g., `sizes="(max-width: 768px) 100vw, 33vw"`) when using the `fill` property on the Next.js <Image> component to ensure the browser requests the correctly sized image based on the current viewport.

## 2026-07-17 - [Cache DOM target in high-frequency event listeners]
**Learning:** In high-frequency event listeners like `mousemove`, constantly re-evaluating expensive DOM traversals (e.g., `.closest()`) and recalculating styles (e.g., `getComputedStyle()`) on every pixel movement causes significant layout thrashing and CPU overhead.
**Action:** Always cache the current DOM target (`e.target`) and only perform expensive checks when the target element actually changes.

## 2026-07-21 - [Double Buffering for Grid Simulations]
**Learning:** In React grid simulations (e.g., Game of Life), allocating a new 2D array via `grid.map(row => [...row])` and calculating cell neighbors using modulo arithmetic in nested loops causes significant CPU and GC overhead. In this codebase's `RetroGame` component, micro-benchmarks showed an 80-90% speedup by employing a double buffer and unrolling the neighbor check loop.
**Action:** When running continuous grid-based cellular automata in React, initialize a second mutable ref (`nextGridRef`) to use as a double buffer and swap them, rather than reallocating new arrays every tick. Use cached row lookups for neighbor calculations.
