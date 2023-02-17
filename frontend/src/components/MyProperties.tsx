import RealStateAgentIcon from "@/components/icons/realStateAgentIcon";
import { Box, CircularProgress, HStack, Text, } from '@chakra-ui/react';
import { Link } from '@/components/Link';
import useMyProperties from '@/hooks/useMyProperties';
import Tag from '@/components/Tag';
import { Token } from "@/store/useTitleTokens";
import { useMemo } from "react";
import { ethers } from "ethers";

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>

export type MyPropertiesProps = {
  jurisdiction?: string
  hidePrice?: boolean
  maxItems?: number
}

const MyProperties = (props:MyPropertiesProps) => {
  const myTokens = useMyProperties(props.jurisdiction)

  const displayedTokens = useMemo(() => {
    if (props.maxItems && props.maxItems > 0) {
      return myTokens.tokens.slice(0, props.maxItems)
    }
    return myTokens.tokens
  }, [myTokens.tokens, props.maxItems])

  return (
    <Box>
      {myTokens.count === -1 && (
        <Tag>
          <LoadingIcon />
        </Tag>
      )}
      {myTokens.count === 0 && <Text>No properties found.</Text>}
      {myTokens.count >= 0 && displayedTokens.map((token) => (<Property key={token.jurisdiction + "/" + token.titleId} token={token} hidePrice={!!props.hidePrice} />))}
    </Box>
  );
}

type PropertyProps = {
  token: Token
  hidePrice: boolean
}

const Property = (props:PropertyProps) => {
  const [min, max] = useMemo(() => {
    let min = ethers.constants.MaxInt256, max = ethers.constants.Zero

    props.token.offersToBuy?.forEach((offer) => {
      if (min.gt(offer.amount)) 
        min = offer.amount
      if (max.lt(offer.amount)) 
        max = offer.amount
    })

    props.token.offersToSell?.forEach((offer) => {
      if (min.gt(offer.amount)) 
        min = offer.amount
      if (max.lt(offer.amount)) 
        max = offer.amount
    })
    
    return [min, max]
  }, [props.token]);
  
  const showPrice = !props.hidePrice
  const hasMin = min.gt(0) && !min.eq(ethers.constants.MaxInt256)
  const hasMax = max.gt(0) && !max.eq(ethers.constants.Zero)
  const hasRange = showPrice && hasMin && hasMax && !max.eq(min)
  const hasSinglePrice = showPrice && hasMin && hasMax && max.eq(min)

  return (
    <Link href={`/jurisdiction/${props.token.jurisdiction}/token/${props.token.titleId}`}>
      <Tag>
        <HStack width="100%">
          <Text variant={'15/20'}>{props.token.titleId}</Text>
          {hasRange &&
            <Text position="absolute" right="70px" variant={'15/20'}>
              <RealStateAgentIcon height={5} width={5} /> Selling for <b>{ethers.utils.formatEther(min)} - {ethers.utils.formatEther(max)} ETH</b>
            </Text>
          }
          {hasSinglePrice &&
            <Text position="absolute" right="70px" variant={'15/20'}>
              <RealStateAgentIcon height={5} width={5} /> Selling for <b>{ethers.utils.formatEther(max)} ETH</b>
            </Text>
          }
        </HStack>
      </Tag>
    </Link>
  );
}

export default MyProperties;
