import { useEffect, useState } from "react";
import {
  Heading,
  Portal,
  Select,
  Progress,
  Table,
  createListCollection,
} from "@chakra-ui/react";
import StampSheetLink from "./StampSheetLink";
import axios from "axios";

function PagePlayerStat() {
  const [sortMethod, setSortMethod] = useState("total_tier");
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setShowError(false);
    setStats(null);

    axios
      .get("https://goldberries.net/api/stamp/list-stats", {
        params: {
          sort: sortMethod,
        },
      })
      .then((r) => {
        setIsLoading(false);
        setShowError(false);
        setStats(r.data);
      })
      .catch((error) => {
        setShowError(true);
        setIsLoading(false);
        setStats(null);
        console.error(error);
      });
  }, [sortMethod]);

  return (
    <>
      <SortSelect onValueChange={(item) => setSortMethod(item.value[0])} />
      {isLoading && <Heading size="2xl">Loading...</Heading>}
      {showError && (
        <Heading size="2xl" color="red.solid">
          Network Error
        </Heading>
      )}
      <PlayerStatTable stats={stats}></PlayerStatTable>
    </>
  );
}

function SortSelect({ onValueChange }) {
  const sortMethods = createListCollection({
    items: [
      { label: "Total Tier", value: "total_tier" },
      { label: "Average Tier", value: "avg_tier" },
      { label: "Stamp Count", value: "stamp_count" },
      { label: "Player Name", value: "name" },
    ],
  });

  return (
    <Select.Root
      collection={sortMethods}
      defaultValue={["total_tier"]}
      onValueChange={onValueChange}
      size="sm"
      width="320px"
      paddingBottom="20px"
    >
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
            {sortMethods.items.map((sortMethod) => (
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

function PlayerStatTable({ stats }) {
  return (
    stats && (
      <Table.Root width="50%">
        <Table.Caption />
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader width="5%">#</Table.ColumnHeader>
            <Table.ColumnHeader width="15%">Player</Table.ColumnHeader>
            <Table.ColumnHeader width="10%">Stamp Count</Table.ColumnHeader>
            <Table.ColumnHeader width="35%"></Table.ColumnHeader>
            <Table.ColumnHeader width="10%">Total Tier</Table.ColumnHeader>
            <Table.ColumnHeader width="10%">Average Tier</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stats.map((player, index) => (
            <Table.Row key={player.player_id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                <StampSheetLink id={player.player_id}>
                  {player.player_name}
                </StampSheetLink>
              </Table.Cell>
              <Table.Cell>{player.stamp_count}/10</Table.Cell>
              <Table.Cell>
                <Progress.Root
                  width="90%"
                  variant="outline"
                  colorPalette="green"
                  defaultValue={player.stamp_count * 10}
                >
                  <Progress.Track borderRadius="full">
                    <Progress.Range borderRadius="full" />
                  </Progress.Track>
                </Progress.Root>
              </Table.Cell>
              <Table.Cell>{player.total_tier}</Table.Cell>
              <Table.Cell>{player.avg_tier.toFixed(2)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell />
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    )
  );
}

export default PagePlayerStat;
