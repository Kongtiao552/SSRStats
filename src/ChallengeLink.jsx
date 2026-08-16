import { Link } from "@chakra-ui/react";

function ChallengeLink({ children, id }) {
  return <Link href={"https://goldberries.net/challenge/" + id} target="_blank" color="blue.solid">{children}</Link>
}

export default ChallengeLink;