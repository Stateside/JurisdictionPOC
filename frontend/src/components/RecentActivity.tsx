import { Flex, Text } from "@chakra-ui/react";
import { ObjectHashInterface, RecentActivityInterface, ActivityInterface } from "@/interfaces/index";
import Tag from "@/components/Tag";
import PaymentsIcon from '@/components/icons/paymentsIcon';
import RealStateAgentIcon from "@/components/icons/realStateAgentIcon";
import CallReceivedIcon from "@/components/icons/callReceivedIcon";
import CallMadeIcon from "@/components/icons/callMadeIcon";
import { getAccountShortName } from '@/utils/util';
import { Link } from "./Link";

export default function RecentActivity({ activities, ...props }: RecentActivityInterface) {
    const getIcon = (type: string) => {
        const icons: ObjectHashInterface = {
            received: <CallReceivedIcon />,
            made: <CallMadeIcon />,
            sellingMe: <RealStateAgentIcon />
        }
        return icons[type];
    }

    const buildActivity = (activity: ActivityInterface) => {
        const copy: ObjectHashInterface = {
            received: activity.account && `You have a new offer from ${getAccountShortName(activity.account)} on token ID`,
            made: 'You made an offer on token ID',
            sellingMe: activity.account && `${getAccountShortName(activity.account)}  is selling you token ID`
        }
        return `${copy[activity.type]} ${activity.tokenID} for ${activity.price}`;
    }

    return (
        <Flex flexDirection={'column'}>
            {
                activities.map((item: any, key: number) => {
                    const { type } = item;
                    return (
                        <Link href='/property-details/title-1/0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'>
                            <Tag type={type} key={key}>
                                <Flex width={type === 'sellingMe' ? '25px' : '50px'}>
                                    {getIcon(type)}
                                    {type !== 'sellingMe' && <PaymentsIcon />}
                                </Flex>
                                <Text 
                                    variant={{base: '13/16', sm: '13/16', md: '15/20', lg: '15/20'}}
                                    fontSize={{base: '0 20px', sm: '0 20px', md: '0 30px', lg: '0 45px' }}
                                    padding={{base: '0 10px 0 0', sm: '0 10px 0 0', md: '0', lg: '0' }}
                                    marginLeft='10px'>
                                    {buildActivity(item)}
                                </Text>
                            </Tag>
                        </Link>
                    )
                })
            }
        </Flex>
    );
}