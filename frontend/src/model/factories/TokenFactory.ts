import {BigNumber} from 'bignumber.js';
import { jscJurisdictionInfo, thisPropertyInfo, locationData, gpsCoordinates, degreeCoordinates, imageInfo } from '@/utils/types';
import { PropertyInfo, OfferInfo } from '@/utils/property-types';
import { Token } from '@/store/useTitleTokens';
import { ethers } from 'ethers';

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

export const buildPropertyInfo = (
  titleInfo:Token,
  thisPropertyInfo: thisPropertyInfo,
  jurisdictionAddress: string,
  jscJurisdictionInfo?: jscJurisdictionInfo,
  ownerAlias?: string,
): PropertyInfo[] => {
  const propertyLocationInDegrees = buildLocationString(thisPropertyInfo.locationData, 'degree');
  const propertyInfo = [
    {
      infoLabel: 'Owner:',
      infoValue: ownerAlias || '',
    },
    {
      infoLabel: 'Jurisdiction:',
      infoValue: jscJurisdictionInfo?.name || '',
    },
    {
      infoLabel: 'Token ID:',
      infoValue: titleInfo.tokenId,
    },
    {
      infoLabel: 'Title ID:',
      infoValue: titleInfo.titleId,
    },
    {
      infoLabel: 'URI:',
      infoValue: titleInfo.url || '',
    },
    {
      infoLabel: 'Location:',
      infoValue: propertyLocationInDegrees,
    },
    {
      infoLabel: 'Description:',
      infoValue: thisPropertyInfo.propertyDescription
    },
    {
      infoLabel: 'Frozen:',
      infoValue: `${titleInfo.frozen}`
    }
  ];

  return propertyInfo;
}

export const buildActiveOffersInfo = (
  titleInfo:Token,
  type: 'OfferToBuy' | 'OfferToSell'
):OfferInfo[]  => {
  const offers = (type === 'OfferToSell' ? titleInfo.offersToSell : titleInfo.offersToBuy) || []
  return offers?.map((offer) => {
    // Convert price to ETH
    const ammount = parseFloat(ethers.utils.formatEther(offer.amount));
    const expiresAfter = 7
    const expiresOn = offer.offeredOn.toNumber() + 7*24*60*60
    const daysLeft = Math.ceil((expiresOn - Date.now()/1000)/60/60/24)

    return {
      tokenId: titleInfo.titleId,
      address: offer.buyer,
      price: ammount,
      expiresAfter,
      expiresOn,
      daysLeft,
      type,
    }
  })
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
      },
      {
        infoLabel: 'Description:',
        infoValue: thisPropertyInfo.propertyDescription
      }
    ];
  }

  return propertyInfo;
};

// export const buildActiveOffersInfoByTitleId = (
//   tokens: Token[],
//   titleId: string,
//   offerType: 'buy' | 'sell'
// ): OfferInfo[] => {
//   const theToken = getTokenByTitleId(tokens, titleId);
//   let activeOffersInfo: OfferInfo[] = [];

//   if (theToken) {
//     const offers =
//       offerType === 'sell' ? theToken.offersToSell : theToken.offersToBuy;
//     const type = offerType === 'sell' ? 'made' : 'received';

//     for (let oi = 0; oi < offers.length; ++oi) {
//       const offer = offers[oi];

//       activeOffersInfo.push({
//         tokenId: titleId,
//         fromAddress: offer.buyerAddress,
//         price: offer.amount,
//         expiresAfter: 7,
//         type,
//       });
//     }
//   }

//   return activeOffersInfo;
// };

const TokenFactory = {
  getTokenByTitleId,
  buildTokenInfoByTitleId,
  buildPropertyInfo,
  // buildActiveOffersInfoByTitleId,
  buildActiveOffersInfo,
  buildLocationString,
  buildDegreeString,
  buildCartesianString,
};

export default TokenFactory;