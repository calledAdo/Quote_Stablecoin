//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;
import {Factory} from "../Core/Factory.sol";
import {GlobalState} from "../Governance/Globalstate.sol";
import {PrivateProvider} from "../Core/PrivateProvider.sol";

/**
 * @title ProviderDetailsFetcher
 *
 *
 * @author CalledDAO
 * @dev utilised  for fetching address of functional providers that a user can utilise;
 */

contract ProviderDetailsFetcher {
    Factory factory = Factory(0xc7078EF8707c029988fA1b863f400667DC8e0D45);

    /**
     * @dev gets the  address of the providers that a user can open positions with
     *
     * NOTE:conditions:
     *  The user must have a zero collateral size in that provider
     *  The provider must  not be paused;
     *  The provider must have a non zero value for the max amount of Quote mintable;
     * @param account The account
     *
     *
     */

    function getfunctionalAddress(
        address account
    ) external view returns (address[] memory) {
        uint numOfProviders = factory.numberOfProviders();
        address[] memory activeProviders = new address[](numOfProviders);
        uint numOfFunctionalAddress = 0;

        for (uint i = 0; i < numOfProviders; i++) {
            address providerAddress = factory.id_to_provider(i + 1);
            PrivateProvider provider = PrivateProvider(
                payable(providerAddress)
            );
            PrivateProvider.ProviderDetails memory providerDetails = provider
                .getProviderDetails();
            if (
                !providerDetails.providerState.isPaused &&
                providerDetails.maxQuoteMintable != 0 &&
                provider
                    .getAccountPositionDetails(account)
                    .position
                    .collateralSize ==
                0
            ) {
                activeProviders[numOfFunctionalAddress] = providerAddress;
                numOfFunctionalAddress++;
            }
        }

        return activeProviders;
    }
}
