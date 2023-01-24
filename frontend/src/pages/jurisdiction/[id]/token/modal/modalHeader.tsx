import { ReactNode } from 'react';
import { Box } from '@chakra-ui/layout';

type PropertyDetailsModalHeader = {
  headerContent: ReactNode;
};
export default function PropertyDetailsModalHeader({
  headerContent,
}: PropertyDetailsModalHeader) {
  return (
    <Box as="span" fontWeight="400" fontSize={{ base: '60px' }}>
      {headerContent}
    </Box>
  );
}
