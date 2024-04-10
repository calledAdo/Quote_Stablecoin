//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

/// @title Minter
/// @notice Core contract containing logic for minting and burning quote and STATH
import {PriceFeed} from "./PriceFeed.sol";
import {PriceMath} from "../Libraries/PriceMath.sol";

import {OwnableERC20} from "./OwnableERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PROVIDER {
    using PriceMath for uint;
    uint32 constant percent_bips = 10 ** 6;
    uint32 public feeXPBips = 10 ** 4;
    bool locked;

    /// @dev dummy test variable for price fetching locally and testing
    bool dummyTest = true;
    //token addresses
    PriceFeed immutable _priceFeed;
    uint totalQuoteMinted;

    event MintedQuote(address account, uint amount);
    event BurnedQUOTE(address account, uint256 amount);

    error BelowMinCollateralMultiplier(uint resultingCollateralMul);

    /// @dev modifier that implements and protects against re-entranncy calls into the called function
    modifier noReentrancy() {
        require(!locked, "");
        locked = true;
        _;
        locked = false;
    }

    constructor(address pricefeed_, bool dummytesting_) payable {
        dummyTest = dummytesting_;
        _priceFeed = PriceFeed(pricefeed_);
    }

    //The following functions are callable functions for intercating with the smart contract

    /**
     * @dev these functions utilise a simple reentrancy guard
     *
     *
     */
    function mintQUOTE(
        uint min_multiplier
    ) external payable noReentrancy returns (uint) {
        require(msg.value != 0);
        return
            _updateQUOTE(
                msg.value,
                address(this).balance,
                true,
                min_multiplier
            );
    }

    function burnQUOTE(uint amountIn) external noReentrancy returns (uint) {
        require(amountIn != 0);
        return _updateQUOTE(amountIn, address(this).balance, false, 0);
    }

    /**
     * @notice calculates the amount of QUOTE(amountOut) to mint for depositing the amount of WEI(amountIn)
     * @dev Dummy Test variable is utilised when intercating locally it returns a hardcoded price of $4000 per ETH and 8 as decimal
     * @param amountIn amount of wei to be converted
     * @param poolBalance the wei balance of the pool
     * @param mint true if minting and false if burning
     *  //NOTE :
     *   This function is only utilised for logic as it also checks for transaction resulting Undercollateralization and throws an error
     *
     * @return The amount equivalent of QUOTE to mint(for minting) or ETH to send(for burning)
     */

    function _updateQUOTE(
        uint amountIn,
        uint poolBalance,
        bool mint,
        uint MIN_COLLATERAL_MULTIPLIER
    ) internal view returns (uint) {
        uint amountOut;
        (int price, uint8 decimal) = _priceFeed.getPrice(dummyTest);
        if (mint) {
            amountOut = amountIn.computeQUOTE(price, decimal);

            //gets the collateral just sufficient to back the resulting total supply
            uint sufficientCollateral = _sufficientCollateral(
                amountOut,
                price,
                decimal
            );
            uint excessCollateral = poolBalance - sufficientCollateral;
            //Checks that the resulting pool balance is at least greater than the 4 * (sufficient collateral + amountIn)
            //reverts if it is lower
            if (
                excessCollateral <
                (MIN_COLLATERAL_MULTIPLIER * sufficientCollateral)
            ) {
                revert BelowMinCollateralMultiplier(
                    (poolBalance - amountIn) / amountIn
                );
            }
        } else {
            amountOut = amountIn.computeWEI(price, decimal);
        }
        return amountOut;
    }

    // /**
    //  *
    //  * @param amountIn The of WEI or LETH to deposit or burn
    //  *
    //  * @param poolBalance The balance of the smart contract
    //  * @param mint true if minting and false if burning
    //  * Note:
    //  *     The value of LETH totalSupply at any time is equal to the difference between Excess Collateral and Sufficient Collateral
    //  *     The Sufficient  collateral is the amount of WEI equivalent in value to the entire totalQuoteMinted
    //  */

    // function _updateLETH(
    //     uint amountIn,
    //     uint poolBalance,
    //     bool mint,
    // ) private view returns (uint) {
    //     if (amountIn == poolBalance) {
    //         return amountIn;
    //     }
    //     uint amountOut;
    //     uint lethTotalSupply = IERC20(leth_address).totalSupply();
    //     (int price, uint8 decimal) = _priceFeed.getPrice(dummyTest);
    //     uint sufficientCollateral = _sufficientCollateral(0, price, decimal);
    //     uint excessCollateral = poolBalance - sufficientCollateral;
    //     if (mint) {
    //         amountOut =
    //             (lethTotalSupply * amountIn) /
    //             (excessCollateral - amountIn);
    //         if (totalQuoteMinted == 0) {
    //             return amountOut;
    //         }
    //         //checks if the transaction results in collateral upper cap being exceeded
    //         //reverts if that is the case
    //         if (
    //             excessCollateral >
    //             (MAX_COLLATERAL_MULTIPLIER * sufficientCollateral)
    //         ) {
    //             revert AboveMaxCollateralMultiplier(
    //                 excessCollateral / sufficientCollateral
    //             );
    //         }
    //     } else {
    //         amountOut = (excessCollateral * amountIn) / (lethTotalSupply);
    //         if (totalQuoteMinted == 0) {
    //             return amountOut;
    //         }
    //         uint excessCollateralAfter = excessCollateral - amountOut;
    //         //Checks that the resulting excess collateral is not less collateral lower cap
    //         if (
    //             excessCollateralAfter <
    //             (MIN_COLLATERAL_MULTIPLIER * sufficientCollateral)
    //         ) {
    //             revert BelowMinCollateralMultiplier(
    //                 excessCollateralAfter / sufficientCollateral
    //             );
    //         }
    //     }
    //     return amountOut;
    // }

    //utils functions

    function _sufficientCollateral(
        uint delta,
        int price,
        uint8 decimal
    ) private view returns (uint) {
        return (totalQuoteMinted + delta).computeWEI(price, decimal);
    }
}
