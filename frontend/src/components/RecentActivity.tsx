import { Flex } from "@chakra-ui/react";
import { ObjectHashInterface, RecentActivityInterface, ActivityInterface } from "@/interfaces/index";
import Tag from "@/components/Tag";
import PaymentsIcon from '@/components/icons/paymentsIcon';
import RealStateAgentIcon from "@/components/icons/realStateAgentIcon";
import CallReceivedIcon from "@/components/icons/callReceivedIcon";
import CallMadeIcon from "@/components/icons/callMadeIcon";
import { getAccountShortName } from '@/utils/util';

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
                        <Tag type={type} key={key}>
                            <Flex width={type === 'sellingMe' ? '25px' : '50px'}>
                                {getIcon(type)}
                                {type !== 'sellingMe' && <PaymentsIcon />}
                            </Flex>
                            <Flex marginLeft='10px'>
                                {buildActivity(item)}
                            </Flex>
                        </Tag>
                    )
                })
            }
        </Flex>
    );
}