import mockedData from '../data/mockedData.json';
import {thisPropertyInfo} from '@/utils/types';

const {data} = mockedData;

const defoInfo: thisPropertyInfo = {
  "titleId": "not found",
  "ownerInfo": {
    "id": "",
    "fname": "",
    "lname": ""
  },
  "url": "",
  "locationData": {
    "address": "",
    "gpsCoordinates": {
      "n": {
        "d": 0,
        "m": 0,
        "s": 0
      },
      "w": {
        "d": 0,
        "m": 0,
        "s": 0
      }
    },
    "lat": 0,
    "lon": 0
  },
  "images": [
    {
      "src": "",
      "alt": ""
    }
  ],
  propertyDescription: ''
}

export const getTokenInformationByTitleId = (titleId: string):thisPropertyInfo  => {
  const token = data.find(({titleId: dataTitleId}) => dataTitleId === titleId);

  return token || defoInfo;
};

const DataService = {
  getTokenInformationByTitleId
};

export default DataService;