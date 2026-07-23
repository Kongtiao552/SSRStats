import { Heading, Link, Stack, Tabs, Text } from "@chakra-ui/react";
import PlayerLink from "./PlayerLink";
import PagePlayerStat from "./PagePlayerStat";
import PageMapStat from "./PageMapStat";
import { GoPeople } from "react-icons/go";
import { FaRegMap } from "react-icons/fa";


function App() {
  return (
    <Stack mt="20px" align="center">
      <Heading size="3xl">Summer Stamp Rally Stats</Heading>
      <Text>
        Hi, I'm <PlayerLink id="912">Kongtiao</PlayerLink>, the creator of this website. This website fetches <APILink>the gb api</APILink> and displays the stats in a table. Thanks to <PlayerLink id="683">viddie</PlayerLink> for helping me build it!
      </Text>

      <Tabs.Root defaultValue="page-player-stat" justify="center" align="center" width="100%">
        <Tabs.List>
          <Tabs.Trigger value="page-player-stat">
            <GoPeople />
            Player Stats
          </Tabs.Trigger>
          <Tabs.Trigger value="page-map-stat">
            <FaRegMap />
            Map Stats
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="page-player-stat">
          <PagePlayerStat />
        </Tabs.Content>
        <Tabs.Content value="page-map-stat">
          <PageMapStat />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
}

function APILink({ children }) {
  return <Link href="https://goldberries.net/api-docs" target="_blank" color="blue.solid">{children}</Link>
}
 
export default App;
