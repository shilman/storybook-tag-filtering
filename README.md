# Storybook sidebar filtering

This is a simple proof of concept to test the sidebar filtering functionality available in SB 7.x.

[👉 View the Storybook](https://65544292ab81956447e652ce-yxonsiqxck.chromatic.com/?path=/docs/example-button--docs)

### Static filtering

It hides all stories that has the `docs-only` or `test-only` tags, which are the `Button`'s `DocsOnly` and `TestOnly` stories. They are not visible in the sidebar but are still visible in the auto-generated documentation.

The use case is that some stories only exist for the auto-generated docs, or in tests that you run in Storybook's test runner, and therefore should not be present in the sidebar.

### Dynamic filtering

It also contains a toolbar button with a "filter" icon that toggles stories on and off depends on whether they have the `implementation` tag  (The `Implementation1` and `Implementation2` stories)

The use case is that you might share your storybook with designers who don't want to see detailed implementation-oriented stories.

This would not be enabled by default but would be user-configurable.

### Autodocs filtering

It filters out `test-only` stories from Autodocs. It also excludes stories with a truthy `docs.disable` parameter, which is the default filter behavior.

### Open questions / followup

- [ ] We need to make `globals` available in the DocsContext to enable dynamic filtering of `implementation` stories on the Autodocs page

### Install and run

To run the demo:

```bash
pnpm i
pnpm storybook
```

The important code is located in:
- `.storybook/manager.ts` adds the static & dynamic filters
- `src/stories/Button.stories.ts` sets up the tags

