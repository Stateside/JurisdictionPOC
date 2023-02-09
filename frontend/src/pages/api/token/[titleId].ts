import mockedData from '../../../model/data/mockedData.json';
import { NextApiRequest, NextApiResponse } from "next";
import { thisPropertyInfo } from '@/utils/types';

const DATA_FILE = "src/model/data/mockedData.json"
type TitleData = {
  [titlelId: string]: thisPropertyInfo
}

const loadData = async () => {
  const properties:TitleData = {}
  mockedData.data.forEach(t => {
    properties[t.titleId] = t
    t.images = []
    for (let i = 1; i <= 3; i++) {
      t.images.push({
        src: `https://picsum.photos/seed/${t.titleId}-${i}/297/198`,
        alt: `Image ${i} of ${t.locationData.address}`,
      })
    }
  })
  return properties;
}

/** Gets all known contract addresses from the database */
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