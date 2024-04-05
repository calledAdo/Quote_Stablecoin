// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

library PriceMath {
    /// @notice computes the USD equivalent
    /// @param price gets the value
    /// @param ethAmount gets the value
    /// @param decimal the price precision
    /// @return amount
    function computeUSDEquivalent(
        int256 price,
        uint ethAmount,
        uint8 decimal
    ) internal pure returns (uint amount) {
        return (ethAmount * uint256(price)) / (10 ** decimal);
    }

    /// @notice computes the ETH equivalent
    /// @param price gets the value
    /// @param usdAmount gets the value
    /// @param decimal the price precision
    /// @return amount amount to return
    function computeETHEquivalent(
        int256 price,
        uint usdAmount,
        uint8 decimal
    ) internal pure returns (uint amount) {
        return (usdAmount * (10 ** decimal)) / uint256(price);
    }
}
