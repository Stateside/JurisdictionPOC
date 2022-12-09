import { Button, HStack, Input, VStack } from '@chakra-ui/react';
import DeleteIcon from '@/components/icons/deleteIcon';

type MemberInfo = {
  name: string;
  token: string;
  position: string;
};

const mockedMembers:MemberInfo[] = [
  {
    name: 'Paul',
    token: '0xCA2a55Ebde55a8C8baaFe4eeb42B2726D6583A84',
    position: 'Legislative',
  },
];

const Members = () => {
  return (
    <VStack alignItems="flex-start">
      {mockedMembers.map((member: MemberInfo) => {
        return (
          <HStack width="100%">
            <Input width="20%" value={member.name} />
            <Input width="40%" value={member.token} />
            <Input width="20%" value={member.position} />
            <Button width="20%" rightIcon={<DeleteIcon height={7} width={7} />}>
              Remove
            </Button>
          </HStack>
        );
      })}
    </VStack>
  );
}

export default Members;