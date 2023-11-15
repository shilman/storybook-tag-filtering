# Storybook sidebar filtering

This repo demos adding a project-level sidebar filter based on tags.

It hides all stories that has the `docs-only` or `test-only` tags.

To run the demo:

```bash
pnpm i
pnpm storybook
```

The important code is located in:
- `.storybook/manager.ts` adds the filter
- `src/stories/Button.stories.ts` sets up the tags

