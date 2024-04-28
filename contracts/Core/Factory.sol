//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import {OwnableERC20} from "./OwnableERC20.sol";
import {PrivateProvider} from "./PrivateProvider.sol";
import {PublicProvider} from "./PublicProvider.sol";

/**@notice Main interface for creating new providers and storing them with a  unique ID
 * @title Factory
 *
 * @author CalledDAO
 * @dev factory contract for creating new PrivateProviders
 */

contract Factory {
    address public QUOTE_TOKEN;
    address public publicProvider;
    address immutable _globalState;
    address immutable _priceFeed;
    address aaveGateway;
    address immutable aToken;
    uint16 public numberOfProviders;

    //mappings
    mapping(uint => address) public id_to_provider;

    //modifier for one time functions
    bool isInit;
    modifier oneTime() {
        require(!isInit);
        _;
        isInit = true;
    }

    constructor(
        address globalState_,
        address priceFeed_,
        address aaveGateway_,
        address aToken_
    ) {
        aaveGateway = aaveGateway_;
        aToken = aToken_;
        _globalState = globalState_;
        _priceFeed = priceFeed_;
        QUOTE_TOKEN = address(new OwnableERC20("QUOTE STABLECOIN", "QUOTE", 6));
    }

    /**
     * @dev this is a one time function that can not be called again due to the oneTime modifier
     * @param publicProvider_ the depployed private provider
     *
     */
    function init(address publicProvider_) external oneTime {
        publicProvider = publicProvider_;
        OwnableERC20(QUOTE_TOKEN).setAllowed(publicProvider_);
    }

    /**
     * @param name the name of the provider
     *
     * @dev this creates a new provider that and the  setAllowed function makes it able to mint QUOTE
     */
    function createNewProvider(string memory name) external {
        address newProvider = address(
            new PrivateProvider(
                name,
                msg.sender,
                _priceFeed,
                _globalState,
                QUOTE_TOKEN,
                aaveGateway,
                aToken
            )
        );
        OwnableERC20(QUOTE_TOKEN).setAllowed(newProvider);
        numberOfProviders += 1;
        id_to_provider[numberOfProviders] = newProvider;
    }
}
