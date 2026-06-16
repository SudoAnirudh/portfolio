## 2023-10-27 - [Hoisting React Array Process]
**Learning:** Extracting pre-computed maps, static objects and `flatMap()` data operations outside React components can reduce local memory re-allocations substantially (e.g. up to 99% reduction) during render.
**Action:** When extracting components dealing with fixed map/array objects, move `Object.fromEntries` or `flatMap()` initialization logic outside the component functional definition to avoid redundant array generation across successive renders.
