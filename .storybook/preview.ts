import type { Preview } from '@storybook/react';

const excludeTags = new Set(['dev-only', 'test-only']);
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocsFilter: (story) => {
        const tags = story.tags || [];
        return (
          tags.filter((tag) => excludeTags.has(tag)).length === 0 && !story.parameters.docs?.disable
        );
      },
    },
  },
};

export default preview;
