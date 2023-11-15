import React, { FC, useEffect, useState } from "react";
import { addons, types, API } from "@storybook/manager-api";
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

const RoleTool: FC<{ api: API }> = ({ api }) => {
  const [isFiltered, setFiltered] = useState(false);
  useEffect(() => {
    const devOnlyFilter = (item) => !!item.tags?.includes('docs') || !item.tags?.includes('dev-only');
    const filter = isFiltered ? devOnlyFilter : () => true;
    api.experimental_setFilter(DYNAMIC_FILTER, filter)
  }, [isFiltered]);

  return (
    <IconButton
      key={DYNAMIC_FILTER}
      active={isFiltered}
      title="Enable measure"
      onClick={() => setFiltered(!isFiltered)}
    >
      <Icons icon="filter" />
    </IconButton>
  );
}

addons.register(DYNAMIC_FILTER, (api) => {
  addons.add(DYNAMIC_FILTER, {
    title: 'role-based filter',
    type: types.TOOL,
    // This should probably also show on `docs` pages,
    // since you could conceivably filter out all the stories
    // & then have no way to get them back?
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <RoleTool api={api} />
  })
});
