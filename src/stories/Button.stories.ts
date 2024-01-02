import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { primary: true },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DocsOnly: Story = {
  args: { label: 'Button (docs-only)' },
  tags: ['docs-only'],
};

export const TestOnly: Story = {
  args: { label: 'Button (test-only)' },
  tags: ['test-only'],
};

export const Normal: Story = {
  args: { label: 'Button (normal)' },
};

export const Implementation1: Story = {
  args: { label: 'Button1 (implementation)' },
  tags: ['implementation'],
};

export const Implementation2: Story = {
  args: { label: 'Button2 (implementation)' },
  tags: ['implementation'],
};
