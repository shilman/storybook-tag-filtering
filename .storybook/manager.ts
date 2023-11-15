import { addons } from "@storybook/manager-api";

const STATIC_FILTER = "static-filter";
const excludeTags = new Set(["docs-only", "test-only"]);
addons.register(STATIC_FILTER, (api) => {
  api.experimental_setFilter(
    STATIC_FILTER,
    (item) =>
      (item.tags || []).filter((tag) => excludeTags.has(tag)).length === 0
  );
});
