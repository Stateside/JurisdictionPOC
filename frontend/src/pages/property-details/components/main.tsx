import { useContext } from 'react';
import { Box } from '@chakra-ui/layout';
import {
  Image,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import HeartPlusIcon from '@/components/icons/heartPlusIcon';
import RealStateAgentIcon from '@/components/icons/realStateAgentIcon';
import ArrowBack from '@/components/icons/smallArrowBackIcon';
import PropertyDetailsModal from '../modal';
import PropertyDetailsModalHeader from '../modal/modalHeader';
import SellPropertyModal from '../modal/sellPropertyModal';
import AcceptOfferModal from '../modal/acceptOfferModal';
import PropertyDetailsModalActions from '../modal/modalActions';
import { PropertyDetailsContext } from '../PropertyDetailsContext';

const gridLayout = 'repeat(12, 1fr)';

export default function PropertyDetailsMain() {
  const {
    actionName,
    propertyId,
    propertyInfo,
    propertyImages,
    activeOffers,
    showSellModal,
    showAcceptOfferModal,
  } = useContext(PropertyDetailsContext);
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
              <BreadcrumbLink href="/dashboard">
                <ArrowBack w={{ base: '28px' }} />
                Back to dashboard
              </BreadcrumbLink>
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
            {propertyId} <HeartPlusIcon w={{ base: '25px' }} />
          </Box>
        </GridItem>
        <GridItem colSpan={7}>
          <Grid templateColumns={gridLayout}>
            <GridItem colSpan={12}>
              {propertyInfo.map(({ infoLabel, infoValue }) => (
                <Grid
                  templateColumns={gridLayout}
                  key={`${infoLabel.toLowerCase()}-${infoValue?.toString()}`}
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
          <Image
            src="/imgs/placeholder-gmap.png"
            alt="Google Maps"
            borderRadius="3px"
          />
        </GridItem>
        <GridItem colSpan={12}>
          <Grid templateColumns={gridLayout}>
            {propertyImages.map(({ src, alt }, i) => {
              return (
                <GridItem colSpan={12 / propertyImages.length} key={i}>
                  <Image
                    src={`/imgs/mock-property-images/${src}`}
                    alt={alt}
                    borderRadius="3px"
                  />
                </GridItem>
              );
            })}
          </Grid>
        </GridItem>
        <GridItem colSpan={12}>
          <Box as="span" fontWeight="700" fontSize={{ base: '15px' }}>
            Active Offers
          </Box>
        </GridItem>
        {/* <GridItem colStart={2} colEnd={6} h='10' bg='papayawhip'></GridItem> */}
        <GridItem colSpan={12}>
          <Grid templateColumns={gridLayout}>
            {activeOffers.map(
              ({ tokenId, recipientAddress, price, expiresAfter }, i) => {
                return (
                  <GridItem colSpan={12} key={i}>
                    <Button
                      variant="Header"
                      rightIcon={<RealStateAgentIcon w={{ base: '25px' }} />}
                      mt={{ base: '30px' }}
                      onClick={() => {
                        showAcceptOfferModal(i);
                      }}
                      _hover={{
                        background: 'brand.javaHover',
                      }}
                    >
                      Accept offer {i + 1}
                    </Button>
                  </GridItem>
                );
              }
            )}
          </Grid>
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
