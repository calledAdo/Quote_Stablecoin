import { ethers } from "hardhat";

export const FetchuserPositions = async (userAddress: string) => {
  const Fetcher = await ethers.getContractAt("UserDetailsFetcher", "");
  const addressList = await Fetcher.getUtilisedProviders(userAddress);
  let PositionList = [];
  for (let i = 0; i < addressList.length; i++) {
    const provider = await ethers.getContractAt(
      "PrivateProvider",
      addressList[i]
    );
    const userPositionDetails = await provider.getAccountPositionDetails(
      userAddress
    );
    PositionList[0] = userPositionDetails;
  }

  return PositionList;
};

export const FetchProviderDetails = async (user: string) => {
  const Fetcher = await ethers.getContractAt("ProviderDetailsFetcher", "");
  const addressList = await Fetcher.getfunctionalAddress(user);
  let ProvidersList = [];
  for (let i = 0; i < addressList.length; i++) {
    const provider = await ethers.getContractAt(
      "PrivateProvider",
      addressList[0]
    );
    const providerDetails = await provider.getProviderDetails();
    ProvidersList[i] = providerDetails;
  }

  return ProvidersList;
};
