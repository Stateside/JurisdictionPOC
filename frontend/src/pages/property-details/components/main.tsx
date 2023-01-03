import { useContext } from 'react';
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
} from '@chakra-ui/react';
import Tag from '@/components/Tag';
import RealStateAgentIcon from '@/components/icons/realStateAgentIcon';
import ArrowBack from '@/components/icons/smallArrowBackIcon';
import CallReceivedIcon from '@/components/icons/callReceivedIcon';
import PropertyDetailsModal from '../modal';
import PropertyDetailsModalHeader from '../modal/modalHeader';
import SellPropertyModal from '../modal/sellPropertyModal';
import AcceptOfferModal from '../modal/acceptOfferModal';
import PropertyDetailsModalActions from '../modal/modalActions';
import { PropertyDetailsContext } from '../PropertyDetailsContext';
import { PropertyInfo } from '@/utils/property-types';
import FavoriteTokenButton from '@/components/FavoriteTokenButton';
import { Link } from '@/components/Link';

const gridLayout = 'repeat(12, 1fr)';
const favoriteStyles = { position: 'relative', bottom: '0.3em'};

// Temporary fix to remove errors from build
declare global {
  namespace JSX {
      interface IntrinsicAttributes { w?: any, style?: any, _focus?: any }
  }
}

export default function PropertyDetailsMain() {
  const {
    actionName,
    tokenId,
    jurisdiction,
    propertyId,
    propertyInfo,
    propertyImages,
    propertyMapInfo,
    activeOffers,
    showSellModal,
    showAcceptOfferModal,
    buildActivity,    
  } = useContext(PropertyDetailsContext);
  const mapUrl = `https://maps.google.com/maps?q=${propertyMapInfo}&z=12&amp;output=embed`;

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
          <Breadcrumb fontWeight="700" fontSize={{ base: '15px' }}>
            <BreadcrumbItem h={{ base: '30px' }}>
              <Link href="/">
                <BreadcrumbLink>
                  <ArrowBack w={{ base: '23px' }} />
                  Back to dashboard
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem h={{ base: '30px' }}>
              <BreadcrumbLink href="#" isCurrentPage>
                Your Properties
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </GridItem>
        <GridItem colSpan={12}>
          <Box as="span" fontWeight="400" fontSize={{ base: '80px' }}>
            {propertyId} <FavoriteTokenButton jurisdiction={jurisdiction as string} itemId={propertyId} name={propertyId} />
          </Box>
        </GridItem>
        <GridItem colSpan={7}>
          <Grid templateColumns={gridLayout}>
            <GridItem colSpan={12}>
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
              <Button
                variant="Header"
                rightIcon={<RealStateAgentIcon w={{ base: '25px' }} />}
                mt={{ base: '30px' }}
                onClick={showSellModal}
                _hover={{
                  background: 'brand.javaHover',
                }}
              >
                Sell this Property
              </Button>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={5}>
          {propertyMapInfo.length > 0 &&
            <div className="iframe-rwd" dangerouslySetInnerHTML={{ __html: `<iframe width="425" height="350" src="${mapUrl}" />`}} />
          }
        </GridItem>
        <GridItem colSpan={12} mt={{ base: '30px' }}>
          <Box as="span" fontWeight="700" fontSize={{ base: '15px' }}>
            Photos
          </Box>
        </GridItem>
        <GridItem colSpan={12}>
          <Grid templateColumns={gridLayout}>
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
          {activeOffers.map(
            ({ tokenId, price, fromAddress, expiresAfter, type }, i) => {
              return (
                <Tag type={type} key={i} caret={null}>
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
                        {buildActivity({
                          tokenId,
                          price,
                          fromAddress,
                          expiresAfter,
                          type,
                        })}
                      </Text>
                    </Box>
                    <Box>
                      <Text>Expires in {expiresAfter} days</Text>
                    </Box>
                    <Spacer />
                    <Box height={{ base: '100%' }}>
                      <Text mr="8px" fontWeight="700">
                        {price} ETH
                      </Text>
                    </Box>
                    <Box height={{ base: '100%' }}>
                      <Button
                        h={{ base: '30px' }}
                        variant="Header"
                        onClick={() => {
                          showAcceptOfferModal(i);
                        }}
                        _hover={{
                          background: 'brand.javaHover',
                        }}
                      >
                        Accept
                      </Button>
                    </Box>
                  </Flex>
                </Tag>
              );
            }
          )}
        </GridItem>
      </Grid>

      <PropertyDetailsModal
        modalHeader={
          <PropertyDetailsModalHeader headerContent="Sell Property" />
        }
        modalBody={
          actionName === 'sell' ? (
            <SellPropertyModal gridLayout={gridLayout} />
          ) : (
            <AcceptOfferModal gridLayout={gridLayout} />
          )
        }
        modalFooter={<PropertyDetailsModalActions />}
      />
    </>
  );
}
