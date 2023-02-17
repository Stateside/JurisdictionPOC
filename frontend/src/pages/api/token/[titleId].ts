import mockedData from '../../../model/data/mockedData.json';
import houseImages from '../../../model/data/house.json';
import kitchenImages from '../../../model/data/kitchen.json';
import bedroomImages from '../../../model/data/bedroom.json';
import { NextApiRequest, NextApiResponse } from "next";
import { thisPropertyInfo, imageInfo } from '@/utils/types';

type TitleData = {
  [titlelId: string]: thisPropertyInfo
}

const loadData = async () => {
  const properties:TitleData = {}
  mockedData.data.forEach((t,ti) => {
    const images:imageInfo[] = []
    const imageData = [
      houseImages[ti % houseImages.length],
      kitchenImages[ti % kitchenImages.length],
      bedroomImages[ti % bedroomImages.length],
    ]

    for (let i = 0; i < imageData.length; i++) {
      const img = imageData[i]
      images.push({
        thumbSrc: `${img.urls.raw}&w=297&h=198&fit=scale`,
        src: `${img.urls.raw}&w=1200`,
        alt: img.alt_description || "The house",
      })
    }

    properties[t.titleId] = {
      ...t,
      images
    }
  })

  return properties;
}

/** Gets details of requested titleId */
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const globals:any = global
  if (globals.jsc === undefined)
    globals.jsc = {}

  if (globals.jsc.titleDetails === undefined)
    globals.jsc.titleDetails = await loadData()

  const data = globals.jsc.titleDetails[req.query.titleId as string]
  if (data)
    res.status(200).send(data)
  else
    res.status(404).send("Not found")
}

export default get