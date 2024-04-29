//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;
import {Factory} from "../Core/Factory.sol";
import {PrivateProvider} from "../Core/PrivateProvider.sol";

/**
 * @title UserDetailsFetcher
 *
 * @author CalledDao
 * @notice This contract serves as a base interface for fetching the userposition details
 */

contract UserDetailsFetcher {
    Factory constant factory =
        Factory(0xc7078EF8707c029988fA1b863f400667DC8e0D45);

    /**@dev This loops  through the entire providersArray and gets the providers for which user has deposited collateral;
     *
     * @param user The user
     *
     * @return providerAddresses list of providers that user has positions in
     */

    function getUtilisedProviders(
        address user
    ) external view returns (address[] memory providerAddresses) {
        providerAddresses = new address[](10);
        uint totalPool = Factory(factory).numberOfProviders();
        uint arrayLength = 0;
        for (uint i = 0; i < totalPool; i++) {
            address providerAddress = factory.id_to_provider(i + 1);
            if (_isUserProvider(user, providerAddress)) {
                providerAddresses[arrayLength] = (providerAddress);
                arrayLength++;
            }
        }
        return providerAddresses;
    }

    /**
     *@dev the checks if a user has any position in a particular provider by checking if the user has 
      a position with non zero colateralSize; 
     * @param user the user
     * 
     * @param provider The provider to check for
     */

    function _isUserProvider(
        address user,
        address provider
    ) internal view returns (bool) {
        PrivateProvider _provider = PrivateProvider(payable(provider));
        PrivateProvider.PositionDetails memory userPositionDetails = _provider
            .getAccountPositionDetails(user);
        if (userPositionDetails.position.collateralSize != 0) {
            return true;
        }
        return false;
    }
}
