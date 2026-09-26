# Exercise 3 — Resilient Component Architecture

## State contract

The component has four explicit states:

| State | Visible content | Accessibility contract |
| --- | --- | --- |
| Loading | CSS shimmer skeleton | Component exposes `aria-busy="true"`; loading message is announced politely |
| Live | A grid of sample service metrics | Data is created with DOM APIs and assigned through `textContent` |
| Empty | A clear no-results message | Message is visible and the status region announces the empty result |
| Error | A recoverable error message and retry button | Error is announced; retry is a native keyboard-operable button |

## WBS tasks

### T-03A — Loading skeleton

- Build the shimmer using CSS only; respect `prefers-reduced-motion`.
- Keep placeholder shapes hidden from screen readers and expose a loading status.
- Planned commit: `feat(css): skeleton`

### T-03B — Live data

- Render a CSS Grid of sample metrics with Flexbox metadata badges inside semantic list items and articles.
- Create nodes with `document.createElement` and insert text through `textContent`.
- Planned commit: `feat(js): render live data state`

### T-03C — Empty and error recovery

- Add the empty message, error message, and retry action.
- Ensure retry transitions Error → Loading → Live.
- Ignore stale delayed responses when another demo state is selected.
- Planned commit: `feat(js): add empty and error recovery states`

## Transition contract

- A load request always enters Loading first.
- A request resolves to Live, Empty, or Error.
- Retry from Error starts a new load and resolves to Live.
- Selecting a new demo result cancels the previous pending result so an older timer cannot overwrite the latest choice.

## Acceptance checks

1. Show each of the four states using the demo controls.
2. Confirm the loading panel sets `aria-busy="true"` and resolved states set it to `false`.
3. Confirm Error → Try again → Loading → Live.
4. Navigate every control with Tab and activate it with Enter or Space.
5. Verify the script does not use `innerHTML` for data rendering.
