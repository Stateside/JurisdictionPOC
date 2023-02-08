import { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Spacer } from '@chakra-ui/layout';
import {
  Image,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Flex,
  Text,
  Skeleton,
  SkeletonText,
  useToast,
  AlertStatus,
} from '@chakra-ui/react';
import Tag from '@/components/Tag';
import RealStateAgentIcon from '@/components/icons/realStateAgentIcon';
import ArrowBack from '@/components/icons/smallArrowBackIcon';
import CallReceivedIcon from '@/components/icons/callReceivedIcon';
import PropertyDetailsModal from '../modal';
import PropertyDetailsModalHeader from '../modal/modalHeader';
import PropertyModal from '../modal/PropertyModal';
import PropertyDetailsModalActions from '../modal/modalActions';
import { PropertyDetailsContext } from '../PropertyDetailsContext';
import { ActionNames, PropertyInfo } from '@/utils/property-types';
import FavoriteTokenButton from '@/components/FavoriteTokenButton';
import { Link } from '@/components/Link';
import Gmaps from './Gmaps';
import { useWeb3React } from '@web3-react/core';

const gridLayout = 'repeat(12, 1fr)';

// Temporary fix to remove errors from build
declare global {
  namespace JSX {
      interface IntrinsicAttributes { w?: any, style?: any, _focus?: any }
  }
}

const aPropertyInfoElement:PropertyInfo = {
  infoLabel: '-',
  infoValue: '-'
}

const defoPropertyInfo:PropertyInfo[] = [
  aPropertyInfoElement,
  aPropertyInfoElement,
  aPropertyInfoElement,
  aPropertyInfoElement,
  aPropertyInfoElement,
  aPropertyInfoElement,
];


export default function PropertyDetailsMain() {
  const {
    dataReady,
    actionName,
    jurisdiction,
    propertyId,
    ownerAddress,
    propertyInfo,
    propertyImages,
    propertyMapInfo,
    offersToBuy,
    offersToSell,
    actionButtonDisabled,
    showModal,
    buildActivity,    
  } = useContext(PropertyDetailsContext);
  const mapUrl = `https://maps.google.com/maps?q=${propertyMapInfo.lat},${propertyMapInfo.lon}&z=12&amp;output=embed`;

  const [ isOwner, setIsOwner ] = useState<boolean>(false);
  const { account } = useWeb3React()
  const toast = useToast();

  const allOffers = useMemo(() => {
    const all = [...offersToBuy, ...offersToSell]
    all.sort((a, b) => b.expiresOn - a.expiresOn)
    return all
  }, [offersToBuy, offersToSell])
  
  useEffect(() => {
    if (ownerAddress && account)
      setIsOwner(ownerAddress?.toLowerCase() === account?.toLowerCase())
  }, [ownerAddress, account])

  const showToast = (msg:string, type:AlertStatus) => {
    toast({
      title: msg,
      status: type,
      duration: 5000
    })
  }

  return (
    <>
      <Grid
        position="relative"
        maxW="container.lg"
        py="8"
        // minHeight={'100vh'}
        padding="0"
        templateColumns={gridLayout}
        gap={6}
      >
        <GridItem colSpan={12}>
          <Skeleton h={{ base: '30px' }} w={{base: '100%', md: '300px'}} isLoaded={dataReady}>
            <Breadcrumb fontWeight="700" fontSize={{ base: '15px' }}>
              <BreadcrumbItem h={{ base: '30px' }}>
                <Link href="/" display='flex' h='30px' style={{alignItems: 'center'}}>
                    <ArrowBack w={{ base: '23px' }} style={{display: 'flex', height: '30px', paddingTop: '5px'}} />
                    Back to dashboard
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem h={{ base: '30px' }}>
                <BreadcrumbLink href="#" isCurrentPage>
                  Your Properties
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Skeleton>  
        </GridItem>
        <GridItem colSpan={12}>
          <Box as="span" fontWeight="400" fontSize={{ base: '80px' }} lineHeight={{base: '.63'}}>
            <Skeleton isLoaded={dataReady}>
              {propertyId} <FavoriteTokenButton jurisdiction={jurisdiction as string} itemId={propertyId} name={propertyId} />
            </Skeleton>
          </Box>
        </GridItem>
        <GridItem colSpan={12} mt={{base: '19px'}}>
          <Grid templateColumns={gridLayout} gap={6}>
            <GridItem colSpan={{base: 12, lg: 7}}>
              <Grid templateColumns={gridLayout}>
                <GridItem colSpan={12}>
                  <SkeletonText noOfLines={3} isLoaded={dataReady} />
                  {propertyInfo.map(({ infoLabel, infoValue }:PropertyInfo) => (
                    <Grid
                      templateColumns={gridLayout}
                      key={`${infoLabel.toLowerCase()}-${infoValue?.toString()}`}
                      mb={{ base: '6px'}}
                    >
                      <GridItem colSpan={3}>{infoLabel}</GridItem>
                      <GridItem colSpan={9}>{infoValue}</GridItem>
                    </Grid>
                  ))}
                </GridItem>
                <GridItem colSpan={12}>
                  <Skeleton isLoaded={dataReady} w={{base: '200px'}} h={{base: '40px'}} mt={{ base: '20px' }} endColor='brand.javaHover'>
                    <Button
                      variant="Header"
                      rightIcon={<RealStateAgentIcon w={{ base: '25px' }} />}
                      onClick={() => showModal(isOwner ? 'OfferToSell' : 'OfferToBuy')}
                      _hover={{
                        background: 'brand.javaHover',
                      }}
                    >
                      {isOwner ? "Offer for Sale" : "Offer to Buy"}
                    </Button>
                  </Skeleton>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem colSpan={{base: 12, lg: 5}} mt={{base: '40px', lg: 0}}>
              <Skeleton isLoaded={dataReady} w={{base: '100%'}} h={{base: '100%'}}>
                {Object.keys(propertyMapInfo).length > 0 &&
                  <>
                    <Gmaps lat={propertyMapInfo.lat} lng={propertyMapInfo.lon} />
                    {/* <div className="iframe-rwd" style={{width: '100%', height: '100%'}} dangerouslySetInnerHTML={{ __html: `<iframe width="100%" height="100%" src="${mapUrl}" />`}} /> */}
                  </>
                }
              </Skeleton>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={12} mt={{ base: '30px' }}>
          <Box as="span" fontWeight="700" fontSize={{ base: '15px' }}>
            Photos
          </Box>
        </GridItem>
        <GridItem colSpan={12}>
          <Grid templateColumns={gridLayout} gap={6}>
            {propertyImages.length <= 0 &&
              <GridItem colSpan={12}>
                <Skeleton isLoaded={dataReady} display={{base: 'inline-block'}} w='32.3333%' h='150px' m={{base: '0 .5%'}}>a</Skeleton>
                <Skeleton isLoaded={dataReady} display={{base: 'inline-block'}} w='32.3333%' h='150px' m={{base: '0 .5%'}}>a</Skeleton>
                <Skeleton isLoaded={dataReady} display={{base: 'inline-block'}} w='32.3333%' h='150px' m={{base: '0 .5%'}}>a</Skeleton>
              </GridItem>
            }
            {propertyImages.map(({ src, alt }, i) => {
              return (
                <GridItem colSpan={12 / propertyImages.length} key={i}>
                  <Image
                    src={src}
                    alt={alt}
                    borderRadius="3px"
                  />
                </GridItem>
              );
            })}
          </Grid>
        </GridItem>
        <GridItem colSpan={12} mt={{ base: '30px' }}>
          <Box as="span" fontWeight="700" fontSize={{ base: '15px' }}>
            Active Offers
          </Box>
        </GridItem>
        <GridItem colSpan={12}>
          {allOffers.length <= 0 && (
            <>
              <Skeleton isLoaded={dataReady} w='100%' h='40px' m={{base: '.5% 0'}}>a</Skeleton>
              <Skeleton isLoaded={dataReady} w='100%' h='40px' m={{base: '.5% 0'}}>a</Skeleton>
              <Skeleton isLoaded={dataReady} w='100%' h='40px' m={{base: '.5% 0'}}>a</Skeleton>
            </>
          )}
          {allOffers.map(
            (offer,i) => {
              const { address, price, daysLeft, type } = offer
              let actionName:ActionNames = ""

              if (type === 'OfferToSell') {
                // An offer to sell can be
                // 1. View an offer by me to sell my property to someone else - RetractOfferToSell
                // 2. View an offer by a different owner to sell their property to me - AcceptOfferToSell
                // 3. View an offer by a different owner to sell their property to someone else - ViewOfferToSell
                if (ownerAddress === account && address !== account)
                  actionName = "RetractOfferToSell"
                else if (ownerAddress !== account && address === account)
                  actionName = "AcceptOfferToSell"
                else
                  actionName = "ViewOfferToSell"
              }
              else {
                // An offer to buy can be
                // 1. An offer by me to buy a property from someone else - RetractOfferToBuy
                // 2. An offer by someone else to buy my property - AcceptOfferToBuy
                // 3. An offer by someone else to buy someone owners property - ViewOfferToSell
                if (address === account && ownerAddress !== account)
                  actionName = "RetractOfferToBuy"
                else if (address !== account && ownerAddress === account)
                  actionName = "AcceptOfferToBuy"
                else
                  actionName = "ViewOfferToBuy"
              }

              return (
                <Link onClick={() => showModal(actionName, offer)} key={i}>
                  <Tag type={type} caret={null}>
                    <Flex
                      width={{ base: '100%' }}
                      align="center"
                      justify="middle"
                    >
                      <Box height={{ base: '100%' }}>
                        <CallReceivedIcon />
                      </Box>
                      <Box height={{ base: '100%' }}>
                        <Text m={{ base: '0 20px' }}>
                          {buildActivity(offer)}
                        </Text>
                      </Box>
                      <Box>
                        <Text>Expires in {daysLeft} days</Text>
                      </Box>
                      <Spacer />
                      <Box height={{ base: '100%' }}>
                        <Text mr="8px" fontWeight="700">
                          {price} ETH
                        </Text>
                      </Box>
                    </Flex>
                  </Tag>
                </Link>
              );
            }
          )}
        </GridItem>
      </Grid>

      <PropertyDetailsModal
        modalHeader={
          <PropertyDetailsModalHeader type={actionName} />
        }
        modalBody={
            <PropertyModal gridLayout={gridLayout} type={actionName} />
        }
        modalFooter={<PropertyDetailsModalActions type={actionName} onDone={showToast} actionButtonDisabled={actionButtonDisabled}/>}
      />
    </>
  );
}
