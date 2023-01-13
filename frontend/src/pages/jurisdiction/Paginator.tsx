import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text } from "@chakra-ui/react";

type Props = {
  pageSize: number
  totalItems: number
  currentPage: number // 1, 2, 3...
  onPageChange: (page: number) => void
}

const Paginator = (props:Props) => {
  const { pageSize, totalItems, currentPage, onPageChange } = props;
  const startItem = (currentPage-1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  return (
    <HStack padding="10px" justify="end">
      <Text>{startItem} - {endItem} of {totalItems}</Text>
      <IconButton
        aria-label="Back"
        icon={<ChevronLeftIcon />}
        backgroundColor="transparent"
        onClick={() => {onPageChange(currentPage - 1)}}
        disabled={startItem === 1}
      />
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon />}
        backgroundColor="transparent"
        onClick={() => {onPageChange(currentPage + 1)}}
        disabled={endItem === totalItems}
      />
    </HStack>
  );
}

export default Paginator;