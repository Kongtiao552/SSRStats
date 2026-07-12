import { HStack, Progress, Table, Text } from "@chakra-ui/react";
import StampSheetLink from "./StampSheetLink";

function StatTable({ stats }) {
  return stats && (
    <Table.Root width="50%">
      <Table.Caption />
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader width="5%">#</Table.ColumnHeader>
          <Table.ColumnHeader width="20%">Player</Table.ColumnHeader>
          <Table.ColumnHeader  width="45%">Stamp Count</Table.ColumnHeader>
          <Table.ColumnHeader width="15%">Total Tier</Table.ColumnHeader>
          <Table.ColumnHeader width="15%">Average Tier</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {stats.map((player, index) => (
          <Table.Row>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <StampSheetLink id={player.player_id}>{player.player_name}</StampSheetLink>
            </Table.Cell>
            <Table.Cell>
              <HStack>
                <Text width="10%">{player.stamp_count}/10</Text>
                <Progress.Root width="90%" variant="outline" colorPalette="green" defaultValue={player.stamp_count * 10}>
                  <Progress.Track borderRadius="full">                
                    <Progress.Range borderRadius="full" />
                  </Progress.Track>
                </Progress.Root>    
              </HStack>          
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
  );
}

export default StatTable;
