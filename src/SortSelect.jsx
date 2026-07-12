import { Portal, Select, createListCollection } from "@chakra-ui/react"

function SortSelect({ onValueChange }) {
  const sortMethods = createListCollection({
    items: [
      { label: "Total Tier", value: "total_tier" },
      { label: "Average Tier", value: "avg_tier" },
      { label: "Stamp Count", value: "stamp_count" },
      { label: "Player Name", value: "name" }
    ],
  })

  return (
    <Select.Root collection={sortMethods} defaultValue={["total_tier"]} onValueChange={onValueChange} size="sm" width="320px">
      <Select.HiddenSelect />
      <Select.Label>Select Sort Method</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Sort Method" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {sortMethods.items.map(sortMethod => (
              <Select.Item item={sortMethod} key={sortMethod.value}>
                {sortMethod.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

export default SortSelect;
