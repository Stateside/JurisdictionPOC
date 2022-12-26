import { Token, jscJurisdictionInfo, thisPropertyInfo, locationData, gpsCoordinates, degreeCoordinates, imageInfo } from '@/utils/types';
import { PropertyInfo, OfferInfo } from '@/utils/property-types';

function padCoordinates(num:number):string {
  const len = num > 0 ? 9 : 10;

  return String(num).padEnd(len, '0'); 
}
// ------------------------------------------------------
// Public Methods
// ------------------------------------------------------
export const getTokenByTitleId = (
  tokens: Token[],
  titleId: string
): Token | undefined => {
  return tokens.find(({ titleId: tokenTitleId }) => tokenTitleId === titleId);
};

export const buildDegreeString = (gpsCoordinates: gpsCoordinates):string => {
  let result = '';

  for (const cardinalDir in gpsCoordinates) {
    if (Object.prototype.hasOwnProperty.call(gpsCoordinates, cardinalDir)) {
      const coordData:degreeCoordinates = gpsCoordinates[cardinalDir];
      const coordDataLen = Object.keys(coordData).length;

      if (coordDataLen > 0) {
        result += ` ${coordData.d}°${coordData.m}'${coordData.s}"`;
      }
    }
  }

  return result.trimStart();
}

export const buildCartesianString = (lat: number, lon: number):string => {
  
  return `${padCoordinates(lat)},${padCoordinates(lon)}`;
}

export const buildLocationString = (locationData: locationData, format: 'degree' | 'cartesian'): string => {
  return format === 'degree' ? buildDegreeString(locationData.gpsCoordinates) : buildCartesianString(locationData.lat, locationData.lon);
}

export const buildTokenInfoByTitleId = (
  tokens: Token[],
  jscJurisdictionInfo: jscJurisdictionInfo,
  thisPropertyInfo: thisPropertyInfo,
  titleId: string
): PropertyInfo[] => {
  const theToken = getTokenByTitleId(tokens, titleId);
  const propertyLocationInDegrees = buildLocationString(thisPropertyInfo.locationData, 'degree');
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
        infoValue: propertyLocationInDegrees,
      }
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
  buildLocationString,
  buildDegreeString,
  buildCartesianString,
};

export default TokenFactory;
