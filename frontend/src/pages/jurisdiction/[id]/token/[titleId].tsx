import type { NextPage } from 'next';
import Head from 'next/head';
import PropertyDetailsContext from './PropertyDetailsContext';
import PropertyDetailsMain from './components/main';

const PropertyDetails: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stateside Governance Test Accounts - Property Details</title>
      </Head>
      <PropertyDetailsContext>
        <PropertyDetailsMain />
      </PropertyDetailsContext>
    </>
  );
};

export default PropertyDetails;