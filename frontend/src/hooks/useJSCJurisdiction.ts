import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import * as tc from '../../typechain-types';
import {jscJurisdictionInfo, fetchJurisdictionInfo} from '@/utils/types';

type useJSCJurisdictionHook = [fetchJurisdictionInfo, string];

const defaultJscJurisdictionInfo:jscJurisdictionInfo = {
  name: '',
  address: ''
}

const useJSCJurisdiction = (): useJSCJurisdictionHook => {
  // -----------------------------------------------------------
  // Hook states
  // -----------------------------------------------------------
  const [error, setError] = useState<string>('');
  const { active, account, library } = useWeb3React();

  // -----------------------------------------------------------
  // Hook methods
  // -----------------------------------------------------------

  const fetchJurisdictionInfo = async (tokenJurisdictionAddress: string) => {
    if (active && account && library) {
      try {
        const jscJurisdiction = tc.IJSCJurisdiction__factory.connect(
          tokenJurisdictionAddress,
          library
        );

        const name = await jscJurisdiction.getJurisdictionName();

        return {
          name,
          address: tokenJurisdictionAddress
        }
      } catch (err) {
        console.log(err);
        setError(err as string);

        return defaultJscJurisdictionInfo;
      }
    }

    return defaultJscJurisdictionInfo;
  }

  return [fetchJurisdictionInfo, error];
};

export default useJSCJurisdiction;