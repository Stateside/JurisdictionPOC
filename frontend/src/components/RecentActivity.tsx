import { Flex, Text } from "@chakra-ui/react";
import { ObjectHashInterface } from "@/interfaces/index";
import Tag from "@/components/Tag";
import PaymentsIcon from '@/components/icons/paymentsIcon';
import RealStateAgentIcon from "@/components/icons/realStateAgentIcon";
import CallReceivedIcon from "@/components/icons/callReceivedIcon";
import CallMadeIcon from "@/components/icons/callMadeIcon";
import { Link } from "./Link";
import { ActivitiesItem, IRecentActivities } from "db/interfaces/IRecentActivities";
import PersonAddIcon from "./icons/personAddIcon";
import DeleteIcon from "./icons/deleteIcon";
import ReloadIcon from "./icons/reloadIcon";
import EditIcon from "./icons/editIcon";
import SellIcon from "./icons/sellIcon";
import PencilIcon from "./icons/pencilIcon";
import LockIcon from "./icons/lockIcon";

export type RecentActivityProps = {
    activities: IRecentActivities[]
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    const getIcon = (type: ActivitiesItem) => {
        const icons: ObjectHashInterface = {
            [ActivitiesItem.OfferToBuy]: <CallReceivedIcon />,
            [ActivitiesItem.OfferToSell]: <CallMadeIcon />,
            [ActivitiesItem.AcceptOfferToBuy]: <RealStateAgentIcon />,
            [ActivitiesItem.AcceptOfferToSell]: <RealStateAgentIcon />,
            [ActivitiesItem.RetractOfferToBuy]: <ReloadIcon />,
            [ActivitiesItem.RetractOfferToSell]: <ReloadIcon />,
            [ActivitiesItem.CreateProposal]: <EditIcon />,
            [ActivitiesItem.Vote]: <PersonAddIcon  />,
            [ActivitiesItem.ExecuteProposal]: <LockIcon />,
        }
        return icons[type];
    }

    const includePaymentsIcon = (type: ActivitiesItem) => {
        return [
            ActivitiesItem.AcceptOfferToSell,
            ActivitiesItem.OfferToBuy,
        ].includes(type);
    }

    if (!activities?.length) return (<></>)

    return (
        <Flex flexDirection={'column'}>
            {
                activities.map((item: IRecentActivities) => {
                    const { itemType: type } = item;
                    return (
                        <Link href={item.url} key={item.id}>
                            <Tag type={type}>
                                <Flex width={includePaymentsIcon(type) ? '52px' : '20px'}>
                                    {getIcon(type)}
                                    {includePaymentsIcon(type) && <PaymentsIcon />}
                                </Flex>
                                <Text 
                                    variant={{base: '13/16', sm: '13/16', md: '15/20', lg: '15/20'}}
                                    fontSize={{base: '0 20px', sm: '0 20px', md: '0 30px', lg: '0 45px' }}
                                    padding={{base: '0 10px 0 0', sm: '0 10px 0 0', md: '0', lg: '0' }}
                                    marginLeft='10px'>
                                    {item.text}
                                </Text>
                            </Tag>
                        </Link>
                    )
                })
            }
        </Flex>
    );
}