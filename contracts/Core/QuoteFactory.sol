//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {OwnableERC20} from "./OwnableERC20.sol";
import {PUBLIC_PROVIDER} from "./Factory.sol";

contract QuoteFactory {
    struct ProviderDetails {
        address provider_address;
        uint totalQuoteBacked;
    }
    address immutable QUOTE_TOKEN;
    address Public_Provider;
    mapping(address => uint) user_to_providerID;
    mapping(uint => address) id_to_provider;

    //creating pools
    //minting quote
    //bunring quote
    //updating min-multiplier

    constructor(address priceFeed_, bool isdummy_) {
        QUOTE_TOKEN = address(new OwnableERC20("QUOTE STABLECOIN", "QUOTE"));
        Public_Provider = address(
            new PUBLIC_PROVIDER(priceFeed_, isdummy_, QUOTE_TOKEN)
        );
    }

    function createProvider(uint amountIn) external payable returns (uint) {}

    function mintQUOTE() external {}

    function burnQUOTE() external {}

    function openCDP() external {}

    function closeCDP() external {}
}
