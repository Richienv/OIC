# OIC Dashboard — Test Coverage Analysis

## Current State: Zero Test Coverage

The project has **no tests, no test framework, and no CI pipeline**. All three source files (`App.jsx`, `storage.js`, `main.jsx`) are completely untested.

| File | Lines | Testable Logic | Current Coverage |
|------|-------|----------------|-----------------|
| `src/App.jsx` | 863 | High — business logic, data transformations, UI interactions | 0% |
| `src/storage.js` | 27 | Medium — async storage abstraction with two code paths | 0% |
| `src/main.jsx` | 10 | Low — React mount boilerplate | 0% |

---

## Recommended Test Framework

**Vitest + React Testing Library** is the natural fit for this stack:

- Vitest integrates natively with the existing Vite build (shares `vite.config.js`)
- React Testing Library is the standard for testing React component behavior
- `jsdom` or `happy-dom` provides a DOM environment for component tests

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

---

## Areas to Improve — Prioritized

### Priority 1: Pure Logic (Unit Tests)

These functions contain extractable business logic that can be tested without rendering React components. They are the highest-value, lowest-effort targets.

#### 1A. `getDefault()` — Data Initialization (`App.jsx:18-157`)

**What it does:** Returns the entire default data structure (brand, 6 task tracks with 42 items, 32 memory items, 5 milestones).

**Why test it:**
- It's the source of truth for the entire app. A broken default means a broken app.
- Data integrity bugs (duplicate IDs, missing fields) are silent and hard to catch manually.

**Recommended tests:**
- All task IDs are unique across all tracks
- Every task has required fields: `id`, `text`, `done` (boolean), `p` (one of "red"/"yellow"/"green"), `note`
- Every memory item has `id`, `cat` (valid category), `title`, `text`
- Every milestone has `id`, `text`, `target`, `done`
- Category values in memory items match the keys in `CL` and `CC` maps
- Total counts match expectations (42 tasks, 32 memory items, 5 milestones)
- `notes` array starts empty

#### 1B. Task Aggregation Logic (`App.jsx:201-205`)

**What it does:** Flattens all tasks, calculates completion stats, filters critical items.

```js
const all = Object.entries(d.todos).flatMap(([k,v]) => v.items.map(i=>({...i,track:k})));
const total = all.length;
const done = all.filter(t=>t.done).length;
const pct = total ? Math.round((done/total)*100) : 0;
const critical = all.filter(t=>!t.done && t.p==="red");
```

**Why test it:** This drives the header display, progress bar, and "Do First" section. Wrong math = misleading dashboard.

**Recommended tests:**
- `pct` is 0 when no tasks are done
- `pct` is 100 when all tasks are done
- `pct` rounds correctly (e.g., 1 of 3 done = 33%, not 33.33%)
- `critical` only includes items where `done === false` AND `p === "red"`
- `all` array adds a `track` key to each item
- Handles edge case: empty todos object → `pct` is 0 (not NaN/Infinity)

#### 1C. Memory Filtering (`App.jsx:207-210`)

```js
const filteredMem = d.memory.filter(m =>
  (memCat==="all" || m.cat===memCat) &&
  (!search || m.title.toLowerCase().includes(search.toLowerCase()) || m.text.toLowerCase().includes(search.toLowerCase()))
);
```

**Why test it:** Search is a core interaction. Case-insensitive matching and combined category+text filtering have subtle edge cases.

**Recommended tests:**
- `memCat="all"` returns all items
- Filtering by specific category returns only matching items
- Search matches in `title` field (case-insensitive)
- Search matches in `text` field (case-insensitive)
- Combined category + search narrows results correctly
- Empty search string returns all items in selected category
- Search with no results returns empty array

---

### Priority 2: Storage Adapter (Unit Tests)

#### 2A. `storage.js` — Dual-Path Storage

**What it does:** Wraps `localStorage` and Claude's `window.storage` behind a unified async API.

**Why test it:** Data persistence is critical. If storage fails silently, users lose all their task progress and notes.

**Recommended tests:**
- `get(key)` reads from `localStorage` when `window.storage` is absent
- `get(key)` reads from `window.storage` when present
- `get(key)` returns `null` for missing keys (localStorage path)
- `set(key, value)` writes to `localStorage` and returns `{ key, value }`
- `set(key, value)` delegates to `window.storage.set` when available
- `delete(key)` removes from `localStorage` and returns `{ key, deleted: true }`
- `delete(key)` delegates to `window.storage.delete` when available
- Priority: `window.storage` takes precedence over `localStorage`

---

### Priority 3: State Mutation Functions (Integration Tests)

These functions modify React state via `setD()`. They're best tested by rendering the component and triggering interactions.

#### 3A. `toggle(track, id)` — Task Completion (`App.jsx:188-190`)

**Why test it:** Core user interaction. The nested state update `({...p, todos:{...p.todos, [track]:{...p.todos[track], items: ...}}})` is error-prone.

**Recommended tests:**
- Toggling an incomplete task marks it as done
- Toggling a done task marks it as incomplete (toggle is bidirectional)
- Only the targeted task changes; others remain unaffected
- Works across different tracks (brand, digital, tech, etc.)

#### 3B. `toggleMilestone(id)` — Milestone Completion (`App.jsx:191-193`)

**Recommended tests:**
- Toggling a milestone flips its `done` state
- Other milestones remain unchanged
- Milestone badge count updates accordingly

#### 3C. `addNote()` — Note Creation (`App.jsx:194-198`)

**Why test it:** Has input validation and timestamp generation.

**Recommended tests:**
- Creates a note with trimmed text and timestamp
- New note is prepended (newest first)
- Empty/whitespace-only input is rejected (no note created)
- `noteText` state is cleared after successful add
- Note ID is unique (uses `Date.now()`)

#### 3D. `deleteNote(id)` — Note Deletion (`App.jsx:199`)

**Recommended tests:**
- Removes the correct note by ID
- Other notes remain intact
- Deleting a non-existent ID is a no-op (no crash)

---

### Priority 4: Component Rendering (Component Tests)

#### 4A. Tab Navigation

**What to test:**
- App renders without crashing
- Default tab is "home"
- Clicking each tab button switches the visible content
- Only one tab's content is rendered at a time
- Active tab has distinct styling (fontWeight 600, NAVY color)

#### 4B. `Sec` Component — Collapsible Sections (`App.jsx:212-238`)

**What to test:**
- Renders title and optional badge
- Content is hidden when collapsed
- Content is visible when expanded
- Clicking toggles open/closed state
- `defaultOpen` prop controls initial state
- Chevron rotates 180° when open

#### 4C. Header & Progress Bar

**What to test:**
- Displays correct percentage
- Displays correct "done/total" count
- Progress bar width matches percentage

#### 4D. Quick Stats Cards (Home Tab)

**What to test:**
- Shows correct critical task count
- Shows correct remaining milestones count
- Shows correct notes count

---

### Priority 5: Data Persistence (Integration Tests)

#### 5A. Load on Mount

**What to test:**
- On first load with empty storage, app uses `getDefault()` data
- On load with existing stored data, app restores that data
- Corrupted/invalid JSON in storage doesn't crash the app (caught by try/catch)

#### 5B. Save on Change

**What to test:**
- After toggling a task, updated state is written to storage
- Storage key is `"oic-dash-v4"`
- Data is serialized as valid JSON

---

### Priority 6: Edge Cases & Regression Tests

| Scenario | Expected Behavior |
|----------|-------------------|
| All tasks completed | `pct` = 100, no critical tasks, progress bar full |
| No tasks in a track | Track shows 0/0 without division errors |
| Memory search with special regex chars (e.g., `$`, `(`) | No crash (currently uses `.includes()`, so this is safe) |
| Very long note text | App doesn't break layout |
| Rapid toggle clicks | State remains consistent (no race conditions) |
| `localStorage` full (quota exceeded) | Save fails silently via try/catch |

---

## Structural Recommendations

Before writing tests, consider these refactoring steps to make the code more testable:

1. **Extract `getDefault()` to its own file** (`src/defaults.js`). This allows importing and testing it independently without importing the full React component.

2. **Extract computation functions** (`calcProgress`, `filterMemory`, `flattenTasks`) into a `src/utils.js` file. Pure functions are trivial to unit test.

3. **Extract the `Sec` component** to `src/components/Sec.jsx`. It's already a self-contained component used in multiple tabs.

4. **Add a `test` script** to `package.json`:
   ```json
   "scripts": {
     "test": "vitest",
     "test:ui": "vitest --ui",
     "coverage": "vitest run --coverage"
   }
   ```

5. **Add a Vitest config** in `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       globals: true,
       setupFiles: './src/test/setup.js',
     },
   });
   ```

---

## Suggested Test File Structure

```
src/
├── __tests__/
│   ├── defaults.test.js        # getDefault() data integrity
│   ├── utils.test.js           # Pure logic: progress calc, filtering
│   ├── storage.test.js         # Storage adapter paths
│   ├── App.test.jsx            # Component rendering & interactions
│   └── Sec.test.jsx            # Collapsible section component
└── test/
    └── setup.js                # @testing-library/jest-dom matchers
```

---

## Effort vs. Impact Summary

| Priority | Area | Effort | Impact | Files Changed |
|----------|------|--------|--------|---------------|
| **P1** | Pure logic (defaults, aggregation, filtering) | Low | High | Extract + test |
| **P2** | Storage adapter | Low | High | Test only |
| **P3** | State mutations (toggle, notes) | Medium | High | Component test |
| **P4** | Component rendering (tabs, sections) | Medium | Medium | Component test |
| **P5** | Persistence round-trip | Medium | Medium | Integration test |
| **P6** | Edge cases | Low | Low | Add to existing |

**Recommendation:** Start with P1 and P2. They cover the most critical logic with the least effort, and extracting pure functions will also improve code organization.
