import { Heading, Link, Separator, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import SortSelect from "./SortSelect";
import StatTable from "./StatTable";
import PlayerLink from "./PlayerLink";


function App() {
  const [ sortMethod, setSortMethod ] = useState("total_tier");
  const [ isLoading, setIsLoading ] = useState(true);
  const [ showError, setShowError ] = useState(false);
  const [ stats, setStats ] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setShowError(false);
    setStats(null);

    fetch("https://goldberries.net/api/stamp/list-stats.php?sort=" + sortMethod)
      .then(r => r.json())
      .then(r => {
        setIsLoading(false);
        setShowError(false);
        setStats(r);
      })
      .catch(error => {
        setShowError(true);
        setIsLoading(false);
        setStats(null);
      })
  }, [sortMethod]);

  return (
    <Stack mt="20px" align="center">
      <Heading size="3xl">Summer Stamp Rally Stats</Heading>
      <Text>
        Hi, I'm <PlayerLink id="912">Kongtiao</PlayerLink>, the creator of this website. This website fetches <APILink>the gb api</APILink> and displays the stats in a table. Thanks to <PlayerLink id="683">viddie</PlayerLink> for helping me build it!
      </Text>
      <Separator mt="10px" mb="10px" width="30%" />
      <SortSelect onValueChange={item => setSortMethod(item.value[0])}/>
      <Separator mt="20px" width="30%" />
      {isLoading && <Heading size="2xl">Loading...</Heading>}
      {showError && <Heading size="2xl" color="red.solid">Network Error</Heading>}
      <StatTable stats={stats}></StatTable>
    </Stack>
  );
}

function APILink({ children }) {
  return <Link href="https://goldberries.net/api-docs" target="_blank" color="blue.solid">{children}</Link>
}
 
export default App;
