import { Token } from '@/utils/types';
import { PropertyInfo, OfferInfo } from '@/utils/property-types';

export const getTokenByTitleId = (
  tokens: Token[],
  titleId: string
): Token | undefined => {
  return tokens.find(({ titleId: tokenTitleId }) => tokenTitleId === titleId);
};

export const buildTokenInfoByTitleId = (
  tokens: Token[],
  titleId: string
): PropertyInfo[] => {
  const theToken = getTokenByTitleId(tokens, titleId);
  let propertyInfo: PropertyInfo[] = [];

  if (theToken) {
    propertyInfo = [
      {
        infoLabel: 'Owner:',
        infoValue: theToken.owner || '',
      },
      {
        infoLabel: 'Jurisdiction:',
        infoValue: 'Costa Rica', // TODO: here we need to fetch from somewhere else for this?
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
          theToken.url || `https://www.stateside.agency/tokenid="${titleId}"`, // TODO: here we need to fetch from somewhere else for this?
        // TODO: here we need to fetch from somewhere else for this?
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
