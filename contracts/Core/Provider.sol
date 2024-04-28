//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {PriceMath} from "../Libraries/PriceMath.sol";

import {PriceFeed} from "./PriceFeed.sol";
import {OwnableERC20} from "./OwnableERC20.sol";

import {IFlashLoaner} from "../Interface/IFLashLoaner.sol";
import {GlobalState} from "../Governance/Globalstate.sol";

import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 *
 * @dev base contract for providers(public  and Private)
 * Features:simple Flashloan function with a fixed fee of 0.5%
 * contains method for fetching conversion rates for QUOTE X ETH conversion  without fees;
 *
 */

contract Provider is ReentrancyGuardUpgradeable {
    using PriceMath for uint;

    uint24 constant BASIS_POINT = 10 ** 6;

    address public immutable QUOTE_TOKEN;
    PriceFeed immutable _priceFeed;
    GlobalState immutable _globalState;

    uint public totalQuoteMinted;

    event MintedQuote(address account, uint amount);
    event BurnedQUOTE(address account, uint256 amount);

    error BelowMinCollateralMultiplier();

    constructor(address priceFeed_, address globalState_, address quoteToken) {
        _priceFeed = PriceFeed(priceFeed_);
        _globalState = GlobalState(globalState_);

        QUOTE_TOKEN = quoteToken;
    }

    receive() external payable {}

    /**
     *
     *@dev calcultea the conversion of QUOTE to ETh and vice versa
     */
    function quoteXweiConverter(
        uint amountIn,
        bool mint
    ) public view returns (uint amountOut) {
        (int price, uint8 decimal) = _priceFeed.getPrice();

        if (mint) {
            return amountIn.computeQUOTE(price, decimal);
        }
        return amountIn.computeWEI(price, decimal);
    }

    /**
     *@dev simple flashloan execution
     * @param amount amount to send out
     *
     *
     */

    function FlashLoan(uint amount) external virtual nonReentrant {
        address sender = msg.sender;
        uint balanceBefore = address(this).balance;
        payable(sender).transfer(amount);
        IFlashLoaner(sender).execute();

        //fee of 0.5%
        require(
            address(this).balance ==
                balanceBefore + calcPercent(amount, 5 * (10 ** 3))
        );
    }

    /**
     * @notice the follwing functions are utlised in minting and burning QUOTE
     * @param amountIn the amount of WEI or QUOTE being  sent in or burnt
     * @param account The account to mint to or burn from



      NOTE: additional parameter,only useful in minting events
      @param minMultiplier The min mutiplier of  sufficient collateral that must be 
      in the pool as excess collateral
      

     */

    function _mintQUOTE(
        address account,
        uint amountIn,
        uint24 minMultiplier,
        uint untilisedCollatreal
    ) internal virtual returns (uint) {
        uint amountOut = _updateQUOTE(
            amountIn,
            true,
            minMultiplier,
            untilisedCollatreal
        );
        OwnableERC20(QUOTE_TOKEN).mint(account, amountOut);
        totalQuoteMinted += amountOut;
        emit MintedQuote(account, amountOut);

        return amountOut;
    }

    function _burnQUOTE(
        address account,
        uint amountIn
    ) internal virtual returns (uint) {
        uint amountOut = _updateQUOTE(amountIn, false, 0, 0);
        OwnableERC20(QUOTE_TOKEN).burn(account, amountIn);
        totalQuoteMinted -= amountIn;
        emit BurnedQUOTE(account, amountIn);
        return amountOut;
    }

    /**
     *
     * @param amountIn amountIn
     *
     *
     *
     *
     
     * @param mint true if mint ,false if burn
     */
    function _updateQUOTE(
        uint amountIn,
        bool mint,
        uint24 minMultiplier,
        uint unUtilisedCollateral
    ) internal view returns (uint amountOut) {
        (int price, uint8 decimal) = _priceFeed.getPrice();
        if (mint) {
            amountOut = amountIn.computeQUOTE(price, decimal);

            uint sufficientCollateral = _sufficientCollateral(
                totalQuoteMinted + amountOut,
                price,
                decimal
            );
            uint excessCollateral = address(this).balance -
                sufficientCollateral;
            if (
                (excessCollateral - unUtilisedCollateral) <
                (minMultiplier * sufficientCollateral) / BASIS_POINT
            ) {
                revert BelowMinCollateralMultiplier();
            }
        } else {
            amountOut = amountIn.computeWEI(price, decimal);
        }
        return amountOut;
    }

    //utils functions
    /**
     * Calculates the x % of amount
     */
    function calcPercent(
        uint amount,
        uint24 perc
    ) internal pure returns (uint) {
        return (amount * perc) / BASIS_POINT;
    }

    /**
     *
     * @dev calculates the sufficient collaterel value in ETH just sufficient in value to the amount of QUOTE
     *
     */
    function _sufficientCollateral(
        uint amount,
        int price_,
        uint8 decimal_
    ) internal pure returns (uint) {
        return amount.computeWEI(price_, decimal_);
    }
}
