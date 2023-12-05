# Storybook sidebar filtering

This is a simple proof of concept to test the sidebar filtering functionality available in SB 7.x.

[👉 View the Storybook](https://65544292ab81956447e652ce-arpzvagweh.chromatic.com/?path=/docs/example-button--docs)

### Static filtering

It hides all stories that has the `docs-only` or `test-only` tags, which are the `Button`'s `DocsOnly` and `TestOnly` stories. They are not visible in the sidebar but are still visible in the auto-generated documentation.

The use case is that some stories only exist for the auto-generated docs, or in tests that you run in Storybook's test runner, and therefore should not be present in the sidebar.

### Dynamic filtering

It also contains a toolbar button with a "filter" icon that toggles stories on and off depends on whether they have the `dev-only` tag  (The `DevOnly1` and `DevOnly2` stories)

The use case is that you might share your storybook with designers who don't want to see detailed implementation-oriented stories.

### Open questions / followup

- [ ] Presumably `test-only` stories should be filtered from the auto-generated docs
- [ ] Should `dev-only` stories be dynamically filtered from the auto-generated docs based on the toggle?
- [ ] Should we build some of this into SB out of the box so users get it for free & there is a single consistent tag naming strategy, rather than letting users come up with their own?
- [ ] When we filter a story dynamically and you are currently viewing the story, what should the behavior be?

### Install and run

To run the demo:

```bash
pnpm i
pnpm storybook
```

The important code is located in:
- `.storybook/manager.ts` adds the static & dynamic filters
- `src/stories/Button.stories.ts` sets up the tags

