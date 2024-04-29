//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

library ProviderMath {
    function calculateMaxQuoteToMint(
        uint totalQuoteMinted,
        uint24 minMultiplier,
        uint excessCollateralValue
    ) internal pure returns (uint) {
        uint maxAmountToMint = (excessCollateralValue * (10 ** 6)) /
            minMultiplier;
        int remaining = int(maxAmountToMint) - int(totalQuoteMinted);
        if (remaining > 0) {
            return uint(remaining);
        }
        return 0;
    }
}
