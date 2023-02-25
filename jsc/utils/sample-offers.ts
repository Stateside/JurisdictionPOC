import { Account, accountsByName } from "./accounts"

const { Bob, Sara, Jane, Bryan, Rich, Alex, Peter } = accountsByName

/*
 * Amounts are in finney = 10**15 wei - https://ethereum.org/en/glossary/#finney
 */

export type Offer = { buyer: Account, amt: number }
export type TitleToken = {titleId: string, owner: Account, offersToBuy: Offer[], offersToSell: Offer[]}
export const sampleTokensAndOffers:{[name: string]: TitleToken[]} = {
  "Bob": [
    {
      owner: Bob,
      titleId: "title-1", 
      offersToBuy: [{buyer: Sara, amt: 1000}], 
      offersToSell: [{buyer: Jane, amt: 2000}]
    }
  ],
  "Sara": [
    {
      owner: Sara,
      titleId: "title-2", 
      offersToBuy: [{buyer: Jane, amt: 2500}], 
      offersToSell: [{buyer: Bryan, amt: 3000}]
    },
    {
      owner: Sara,
      titleId: "title-3", 
      offersToBuy: [{buyer: Bryan, amt: 3500}], 
      offersToSell: [{buyer: Peter, amt: 4000}]
    }
  ],
  "Jane": [
    {
      owner: Jane,
      titleId: "title-4", 
      offersToBuy: [{buyer: Peter, amt: 4500}], 
      offersToSell: [{buyer: Alex, amt: 5000}]
    },
    {
      owner: Jane,
      titleId: "title-5", 
      offersToBuy: [{buyer: Alex, amt: 5500}], 
      offersToSell: [{buyer: Bryan, amt: 6000}]
    }
  ],
  "Bryan": [{
      owner: Bryan, 
      titleId: "title-6",
      offersToBuy: [{buyer: Rich, amt: 6500}], 
      offersToSell: [{buyer: Peter, amt: 7000}]
    },
    {
      owner: Bryan, 
      titleId: "title-7", 
      offersToBuy: [{buyer: Peter, amt: 7500}], 
      offersToSell: [{buyer: Bob, amt: 8000}]
    },
    {
      owner: Bryan, 
      titleId: "title-8", 
      offersToBuy: [{buyer: Bob, amt: 8500}], 
      offersToSell: [{buyer: Sara, amt: 9000}]}
  ],
  "Rich": [
    {
      owner: Rich,
      titleId: "title-9", 
      offersToBuy: [{buyer: Jane, amt: 1010}], 
      offersToSell: [{buyer: Bryan, amt: 2010}]
    },
    {
      owner: Rich,
      titleId: "title-10", 
      offersToBuy: [{buyer: Bryan, amt: 3010}], 
      offersToSell: [{buyer: Alex, amt: 4010}]
    },
    {
      owner: Rich,
      titleId: "title-11", 
      offersToBuy: [{buyer: Alex, amt: 5010}], 
      offersToSell: [{buyer: Bob, amt: 6010}]
    },
    {
      owner: Rich,
      titleId: "title-12", 
      offersToBuy: [{buyer: Bob, amt: 7010}], 
      offersToSell: [{buyer: Peter, amt: 8010}]
    }
  ],
  "Alex": [
    {
      owner: Alex,
      titleId: "title-13", 
      offersToBuy: [{buyer: Peter, amt: 1100}], 
      offersToSell: [{buyer: Jane, amt: 2100}]
    },
    {
      owner: Alex,
      titleId: "title-14", 
      offersToBuy: [{buyer: Jane, amt: 1200}], 
      offersToSell: [{buyer: Bryan, amt: 2200}]
    },
    {
      owner: Alex,
      titleId: "title-15", 
      offersToBuy: [{buyer: Bryan, amt: 1300}], 
      offersToSell: [{buyer: Bob, amt: 2300}]
    },
    {
      owner: Alex,
      titleId: "title-16", 
      offersToBuy: [{buyer: Bob, amt: 1400}], 
      offersToSell: [{buyer: Sara, amt: 2400}]
    },
    {
      owner: Alex,
      titleId: "title-17", 
      offersToBuy: [{buyer: Sara, amt: 1500}], 
      offersToSell: [{buyer: Jane, amt: 2500}]
    },
    {
      owner: Alex,
      titleId: "title-18", 
      offersToBuy: [{buyer: Jane, amt: 1600}], 
      offersToSell: [{buyer: Bryan, amt: 2600}]
    },
    {
      owner: Alex,
      titleId: "title-19", 
      offersToBuy: [{buyer: Bryan, amt: 1700}], 
      offersToSell: [{buyer: Bob, amt: 2700}]
    },
    {
      owner: Alex,
      titleId: "title-20", 
      offersToBuy: [{buyer: Bob, amt: 1800}], 
      offersToSell: [{buyer: Sara, amt: 2800}]
    }
  ],
  "Peter": [
    {
      owner: Peter,
      titleId: "title-21", 
      offersToBuy: [{buyer: Sara, amt: 1000}], 
      offersToSell: [{buyer: Jane, amt: 2000}]
    }
  ],
}

