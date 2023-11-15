import React, { FC, useEffect, useState } from "react";
import { addons, types, API } from "@storybook/manager-api";
import { Icons, IconButton } from '@storybook/components';

const STATIC_FILTER = "static-filter";
const excludeTags = new Set(["docs-only", "test-only"]);
addons.register(STATIC_FILTER, (api) => {
  api.experimental_setFilter(
    STATIC_FILTER,
    (item) =>
      (item.tags || []).filter((tag) => excludeTags.has(tag)).length === 0
  );
});

const DYNAMIC_FILTER = "dynamic-filter";

const RoleTool: FC<{ api: API }> = ({ api }) => {
  const [isFiltered, setFiltered] = useState(false);
  useEffect(() => {
    const devOnlyFilter = (item) => !item.tags?.includes('dev-only');
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
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <RoleTool api={api} />
  })
  // api.experimental_setFilter(
  //   DYNAMIC_FILTER,
  //   (item) =>
  //     (item.tags || []).filter((tag) => excludeTags.has(tag)).length === 0
  // );
});
