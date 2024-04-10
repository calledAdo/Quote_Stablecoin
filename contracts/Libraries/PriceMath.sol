// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import {Math} from "./Math.sol";

library PriceMath {
    using Math for uint;

    /// @notice computes the USD equivalent
    /// @param price gets the value
    /// @param weiAmount gets the value
    /// @param decimal the price precision
    /// @return amount
    function computeQUOTE(
        uint weiAmount,
        int price,
        uint8 decimal
    ) internal pure returns (uint amount) {
        return weiAmount.div(10 ** decimal).mul(uint(price)).div(10 ** 12);
    }

    /// @notice computes the ETH equivalent
    /// @param price gets the value
    /// @param quoteAmount gets the value
    /// @param decimal the price precision
    /// @return amount amount to return
    function computeWEI(
        uint quoteAmount,
        int256 price,
        uint8 decimal
    ) internal pure returns (uint amount) {
        return uint(10).pow(12 + decimal).div(uint(price)).mul(quoteAmount);
    }
}
