import React, { FC, useEffect } from "react";
import { addons, types, API, useGlobals } from "@storybook/manager-api";
import { Icons, IconButton } from '@storybook/components';

const STATIC_FILTER = "static-filter";
const excludeTags = new Set(["docs-only", "test-only"]);
addons.register(STATIC_FILTER, (api) => {
  api.experimental_setFilter(
    STATIC_FILTER,
    (item) => {
      const tags = item.tags || [];
      // very strange behavior here. Auto-generated docs entries get
      // the tags of the primary story by default, so if that story
      // happens to be `docs-only`, then filtering it out of the sidebar
      // ALSO filter out the sidebar entry, which is not what we want.
      // Here we special case it, but there should be a better solution.
      return (tags.includes('docs') || tags.filter((tag) => excludeTags.has(tag)).length === 0);
    }
  );
});

const DYNAMIC_FILTER = "dynamic-filter";
const DYNAMIC_FILTER_BOTTOM = "dynamic-filter-bottom";

const RoleTool: FC<{ api: API }> = ({ api }) => {
  const [globals, updateGlobals] = useGlobals();
  const { designView } = globals

  // avoid infinite loop
  useEffect(() => {
    console.log('useEffect')
    const designFilter = (item) => !!item.tags?.includes('docs') || !item.tags?.includes('implementation');
    const filter = designView ? designFilter : () => true;
    api.experimental_setFilter(DYNAMIC_FILTER, filter)
  }, [designView]);

  return (
    <IconButton
      key={DYNAMIC_FILTER}
      active={designView}
      title="Toggle design view"
      onClick={() => updateGlobals({ designView: !designView })}
    >
      <Icons icon="filter" /> Design-only view
    </IconButton>
  );
}

addons.register(DYNAMIC_FILTER, (api) => {
  addons.add(DYNAMIC_FILTER_BOTTOM, {
    type: types.experimental_SIDEBAR_BOTTOM,
    render: () => <RoleTool api={api} />
  })
});
