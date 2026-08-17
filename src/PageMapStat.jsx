import {
  Box,
  Card,
  Flex,
  Heading,
  Table,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ChallengeLink from "./ChallengeLink";

function PageMapStat() {
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setShowError(false);
    setStats(null);

    axios
      .get("https://goldberries.net/api/stamp/challenge-stats")
      .then((r) => {
        setIsLoading(false);
        setShowError(false);
        setStats(r.data);
      })
      .catch((error) => {
        setShowError(true);
        setIsLoading(false);
        setStats(null);
      });
  }, []);

  const stamps = [
    { label: "Heartless </3", id: 0 },
    { label: "Ball and Chain", id: 1 },
    { label: "A New Friend", id: 2 },
    { label: "Universal Language", id: 3 },
    { label: "The Ancient Scripts", id: 4 },
    { label: "Almost Anything", id: 5 },
    { label: "The Sequel", id: 6 },
    { label: "Time to Chill Out", id: 7 },
    { label: "All of Me", id: 8 },
    { label: "Well-Read", id: 9 }
  ];

  return (
    <>
      <PageDescription />
      {isLoading && <Heading size="2xl">Loading...</Heading>}
      {showError && (
        <Heading size="2xl" color="red.solid">
          Network Error
        </Heading>
      )}
      {stats && (
        <Flex wrap="wrap" justifyContent="center" gap="10" width="90%" minWidth="10%">
          {stamps.map((stamp) => (
            <StampCard key={stamp.id} stamp={stamp} stats={stats} />
          ))}
        </Flex>
      )}
    </>
  );
}

function PageDescription() {
  return <Text marginBottom="20px">These are the maps with the most stamp submissions.</Text>;
}

function StampCard({ stamp, stats }) {
  if (!stats) {
    return null;
  }

  const popularMaps = getPopularMaps(stamp, stats);

  return (
    <Card.Root borderRadius="15px" width="700px" minWidth="300px">
      <Card.Body alignItems="center">
        <Card.Title scale="1.4">
          {stamp.label}
        </Card.Title>
        <MapTable maps={popularMaps} />
      </Card.Body>
    </Card.Root>
  );
}

function MapTable({ maps }) {
  return (
    <Table.Root width="90%">
      <Table.Caption />
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader width="10%">#</Table.ColumnHeader>
          <Table.ColumnHeader width="65%">Map</Table.ColumnHeader>
          <Table.ColumnHeader width="10%" textAlign="center">Count</Table.ColumnHeader>
          <Table.ColumnHeader width="15%" textAlign="center">Difficulty</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {maps.map((entry, index) => (
          <Table.Row key={index}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <ChallengeLink id={entry.id}>
                {entry.name}
              </ChallengeLink>
            </Table.Cell>
            <Table.Cell textAlign="center">{entry.count}</Table.Cell>
            <Table.Cell textAlign="center">
              <DifficultyBox difficulty={entry.difficulty} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

function DifficultyBox({ difficulty }) {
  return (
    <Box 
      bgColor={difficultyColors[difficulty.sort + 1]} 
      borderRadius="10px"
      display="inline-block" 
      paddingRight="10px" 
      paddingLeft="10px" 
      textAlign="center"
    >
      {difficulty.name}
    </Box>
  );
}

const difficultyColors = [
  "#aaaaaa", // Undetermined
  "#ffffff", // Untiered
  "#9696ff", // Tier 1
  "#93aeff", // Tier 2
  "#91c8ff", // Tier 3
  "#8eecff", // Tier 4
  "#8cffe2", // Tier 5
  "#89ffb0", // Tier 6
  "#9bff87", // Tier 7
  "#b7ff84", // Tier 8
  "#d5ff82", // Tier 9
  "#f4ff7f", // Tier 10
  "#fff47c", // Tier 11
  "#ffdd7a", // Tier 12
  "#ffc677", // Tier 13
  "#ffae75", // Tier 14
  "#ff9572", // Tier 15
  "#ff7c70", // Tier 16
  "#ff6d79", // Tier 17
  "#ff6daa", // Tier 18
  "#ff68d9", // Tier 19
  "#f266ff", // Tier 20
  "#d863ff", // Tier 21
  "#bd60ff"  // Tier 22
];

function getPopularMaps(stamp, stats) {
  return stats
    .sort((a, b) => getStampCount(stamp, b) - getStampCount(stamp, a))
    .slice(0, 10)
    .map(entry => ({
      id: entry.challenge.id,
      name: getChallengeName(entry.challenge),
      difficulty: entry.challenge.difficulty,
      count: getStampCount(stamp, entry)
    }));
}

function getStampCount(stamp, entry) {
  if (stamp === null) {
    return entry.total;
  }

  return entry.stamps[stamp.id];
}

function getChallengeName(challenge) {
  if (challenge.map === null) {
    return challenge.campaign.name + " (" + challenge.label + ")"
  }

  let name = challenge.map.name;

  if (challenge.label !== null) {
    name += " (" + challenge.label + ")";
  }

  if (challenge.requires_fc) {
    name += " (FC)";
  }

  return name;
}

export default PageMapStat;
