import { ethers } from "hardhat";

import { ETHTOQUOTE, LETHTOETH } from "./PublicProvider";
/**
 * 
 *    struct OpenPositionParams {
        //amount of collateral to utilise
        uint24 percentUtilization;
        //Targets are set to mitigate front-running attacks
        //target IntaterestRate   which if exceeded transaction should fail
        uint24 targetInterestRate;
        //target min drawdown which if exceeded  transaction should fail
        int24 targetMinDrawDrown;
        //target min duration which  is exceeded transaction should fail
        uint targetMinDurtaion;
    }

 * 
 */

type Openrarams = {
  percentUtilization: bigint;
  targetInterestRate: bigint;
  targetMinDrawdown: bigint;
  targetMinDuration: bigint;
};

export const openCDP = async (params: Openrarams, providerAddress: string) => {
  const provider = await ethers.getContractAt(
    "PrivateProvider",
    providerAddress
  );
  await provider.openPosition(params);
};

export const closeCDP = async () => {};

export const topUpCollateral = async () => {};
