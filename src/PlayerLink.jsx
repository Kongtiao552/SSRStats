import { Link } from "@chakra-ui/react";

function PlayerLink({ children, id }) {
  return <Link href={"https://goldberries.net/playe/" + id} target="_blank" color="blue.solid">{children}</Link>
}

export default PlayerLink;