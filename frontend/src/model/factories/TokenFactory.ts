import { Token, jscJurisdictionInfo, thisPropertyInfo, locationData } from '@/utils/types';
import { PropertyInfo, OfferInfo } from '@/utils/property-types';

export const getTokenByTitleId = (
  tokens: Token[],
  titleId: string
): Token | undefined => {
  return tokens.find(({ titleId: tokenTitleId }) => tokenTitleId === titleId);
};

export const buildLocationString = (locationData: locationData, format: 'degree' | 'cartesian') => {

}

export const buildTokenInfoByTitleId = (
  tokens: Token[],
  jscJurisdictionInfo: jscJurisdictionInfo,
  thisPropertyInfo: thisPropertyInfo,
  titleId: string
): PropertyInfo[] => {
  const theToken = getTokenByTitleId(tokens, titleId);
  const propertyLocation = buildLocationString(thisPropertyInfo.locationData, 'degree');
  let propertyInfo: PropertyInfo[] = [];

  if (theToken) {
    propertyInfo = [
      {
        infoLabel: 'Owner:',
        infoValue: theToken.owner || '',
      },
      {
        infoLabel: 'Jurisdiction:',
        infoValue: jscJurisdictionInfo.name,
      },
      {
        infoLabel: 'Token ID:',
        infoValue: theToken.tokenId,
      },
      {
        infoLabel: 'Title ID:',
        infoValue: theToken.titleId,
      },
      {
        infoLabel: 'URI:',
        infoValue:
        thisPropertyInfo.url,
      },
      {
        infoLabel: 'Location:',
        infoValue: '10°17\'40.1"N 85°42\'43.2"W', // TODO: here we need to fetch from somewhere else for this?
      },
    ];
  }

  return propertyInfo;
};

export const buildActiveOffersInfoByTitleId = (
  tokens: Token[],
  titleId: string,
  offerType: 'buy' | 'sell'
): OfferInfo[] => {
  const theToken = getTokenByTitleId(tokens, titleId);
  let activeOffersInfo: OfferInfo[] = [];

  if (theToken) {
    const offers =
      offerType === 'sell' ? theToken.offersToSell : theToken.offersToBuy;
    const type = offerType === 'sell' ? 'made' : 'received';

    for (let oi = 0; oi < offers.length; ++oi) {
      const offer = offers[oi];

      activeOffersInfo.push({
        tokenId: titleId,
        fromAddress: offer.buyerAddress,
        price: offer.amount,
        expiresAfter: 7,
        type,
      });
    }
  }

  return activeOffersInfo;
};

const TokenFactory = {
  getTokenByTitleId,
  buildTokenInfoByTitleId,
  buildActiveOffersInfoByTitleId,
};

export default TokenFactory;
