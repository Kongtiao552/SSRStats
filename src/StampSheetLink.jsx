import { Link } from "@chakra-ui/react";

function StampSheetLink({ children, id }) {
  return <Link href={"https://goldberries.net/event/summer-stamp-rally/" + id} target="_blank" color="blue.solid">{children}</Link>
}

export default StampSheetLink;