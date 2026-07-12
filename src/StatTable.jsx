import { HStack, Progress, Table, Text } from "@chakra-ui/react";
import PlayerLink from "./PlayerLink";

function StatTable({ stats }) {
  return stats && (
    <Table.Root width="50%">
      <Table.Caption />
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader width="20%">Player</Table.ColumnHeader>
          <Table.ColumnHeader  width="60%">Stamp Count</Table.ColumnHeader>
          <Table.ColumnHeader width="10%">Total Tier</Table.ColumnHeader>
          <Table.ColumnHeader width="10%">Average Tier</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {stats.map(player => (
          <Table.Row>
            <Table.Cell>
              <PlayerLink id={player.player_id} target="_blank">{player.player_name}</PlayerLink>
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
            <Table.Cell>{player.avg_tier.toString().slice(0, 4)}</Table.Cell>
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
