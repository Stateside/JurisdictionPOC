import type { NextPage } from 'next';
import PropertyDetailsContext from './PropertyDetailsContext';
import PropertyDetailsMain from './components/main';

const PropertyDetails: NextPage = () => {
  return (
    <PropertyDetailsContext>
      <PropertyDetailsMain />
    </PropertyDetailsContext>
  );
};

export default PropertyDetails;